import React, { useState } from 'react';
import { Button, Modal } from 'react-native';

import { AddExpenseModal, AddExpenseModalWithCamera } from './AddExpenseModal';

export function AddExpenseOption({ showModal, setShowModal, defaultBudgetId, userId }) {
  const [manualEntry, setManualEntry] = useState(false);

  const handleManualEntry = () => {
    console.log("budgetid:", defaultBudgetId)
    setShowModal(true);
    setManualEntry(true);
  };

  const handleCameraEntry = () => {
    setShowModal(true);
    setManualEntry(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setManualEntry(false);
  };

  return (
    <>
      <Modal visible={showModal} onRequestClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Expense</Modal.Title>
          <Button title="Close" onPress={handleClose} />
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button title="Camera" onPress={handleCameraEntry} />
          <Button title="Manual Entry" onPress={handleManualEntry} />
          {manualEntry ? (
            <AddExpenseModal
              show={true}
              handleClose={handleClose}
              defaultBudgetId={defaultBudgetId}
              userId={userId}
            />
          ) : (
            <AddExpenseModalWithCamera
              handleClose={handleClose}
              defaultBudgetId={defaultBudgetId}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
