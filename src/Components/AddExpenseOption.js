import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AddExpenseModal } from './AddExpenseModal';
import { ReceiptUploader } from '../Repository/VeryfiApi/ReceiptUploader';

export function AddExpenseOption({ showModal, setShowModal, defaultBudgetId, userId, amount, max }) {
  const [showManualEntry, setManualEntry] = useState(false);
  const [showReceiptUploader, setShowReceiptUploader] = useState(false);

  const handleManualEntry = () => {
    setShowModal(true);
    setManualEntry(true);
  };

  const handleUpload = () => {
    setShowModal(false );
    setShowReceiptUploader(true);
    setManualEntry(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setManualEntry(false);
    setShowReceiptUploader(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button variant="primary" size="sm-2" onClick={handleUpload}>Upload</Button>
          <Button variant="primary" size="sm-2" onClick={handleManualEntry}>Manual</Button>
          {showManualEntry && (
            <AddExpenseModal
              show={true}
              handleClose={handleClose}
              defaultBudgetId={defaultBudgetId}
              userId={userId}
              amount={amount}
              max={max}
            />
          )}
          {showReceiptUploader && <ReceiptUploader currentUser={userId} budgetID={defaultBudgetId} />}
        </Modal.Body>
      </Modal>
    </>
  );
}
