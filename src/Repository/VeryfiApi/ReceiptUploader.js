import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProcessReceipt } from './ReceiptApi';
import { AddReceiptExpense } from '../../Repository/Database';

export const ReceiptUploader = ({ currentUser, budgetID, onClose }) => {
  const handleReceiptUpload = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

      // repalce by your own Veryfi API credentials
      const clientId = '';
      const clientSecret = '';
      const username = '';
      const apiKey = '';

      const response = await ProcessReceipt(imageBase64, clientId, clientSecret, username, apiKey);

      console.log("Response:", response);

      await AddReceiptExpense(currentUser, budgetID, response.line_items);

      onClose();
    };

    reader.readAsDataURL(file);
  }, [currentUser, budgetID, onClose]);

  const { open } = useDropzone({
    onDrop: handleReceiptUpload,
  });

  useEffect(() => {
    open();
  }, [open]);

  return null;
};
