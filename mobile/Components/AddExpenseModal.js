import React, { useRef } from 'react';
import { Modal, Button, TextInput, View, Text } from 'react-native';
import { AddExpense } from '../Repository/Database';

export function AddExpenseModal({ show, handleClose, defaultBudgetId, userId }) {
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);

  function handleSubmit() {
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;

    AddExpense(userId, defaultBudgetId, description, amount);
    handleClose();
  }

  return (
    <Modal visible={show} animationType="slide">
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>New Expense</Text>
        <TextInput
          ref={descriptionRef}
          placeholder="Description"
          style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}
          required
        />
        <TextInput
          ref={amountRef}
          placeholder="Amount"
          style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}
          required
          keyboardType="decimal-pad"
          min={0}
          step={0.01}
        />
        <Button title="Add" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleClose} />
      </View>
    </Modal>
  );
}

export function AddExpenseModalWithCamera({ show, handleClose, defaultBudgetId }) {
  function handleAddManuallyClick() {
    handleClose();
  }

  function handleUseCameraClick() {
    // handle camera functionality here
  }

  return (
    <Modal visible={show} animationType="slide">
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Add Expense</Text>
        <Button title="Add Manually" onPress={handleAddManuallyClick} />
        <Button title="Use Camera" onPress={handleUseCameraClick} />
        <Button title="Cancel" onPress={handleClose} />
      </View>
    </Modal>
  );
}
