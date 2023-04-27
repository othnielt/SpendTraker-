// server.js
const express = require('express');
const cors = require('cors');
const Client = require('@veryfi/veryfi-sdk');
const fs = require('fs');
const tmp = require('tmp-promise');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/veryfi', async (req, res) => {
  const { imageBase64, clientId, clientSecret, username, apiKey } = req.body;

  const client = new Client(clientId, clientSecret, username, apiKey);

  try {
    const tmpFile = await tmp.file();
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(tmpFile.path, buffer);

    const response = await client.process_document(tmpFile.path);

    tmpFile.cleanup(); // Clean up the temporary file
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing receipt' });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
