import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProcessReceipt } from './ReceiptApi';
import { AddReceiptExpense } from '../../Repository/Database';

export const ReceiptUploader = ({ currentUser, budgetID, onClose }) => {
  const handleReceiptUpload = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

      // Veryfi API credentials
      const clientId = 'vrfJ3iyFF57hGKb3YE18PtBEUJyLUE9GxyAoWfV';
      const clientSecret = 'hpNmOuFrHejYsxf5PjMuGlYi7FjB2e1Eu9rWIb3OPG2voXEOnDaz38GR3yeaE0G7d35URvREYBAeMbHv7TWuXUrntPoDOA63RbYh2h4nX0heznxXmRke2Sro37jKkitJ';
      const username = 'othniel99.ot';
      const apiKey = 'b77770908d10ee50ede5743da685a46d';

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
