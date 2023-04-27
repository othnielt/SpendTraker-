// ReceiptApi.js
import axios from 'axios';

export const ProcessReceipt = async (imageBase64, clientId, clientSecret, username, apiKey) => {
  try {
    const response = await axios.post('http://localhost:5002/api/veryfi', {
      imageBase64,
      clientId,
      clientSecret,
      username,
      apiKey,
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
