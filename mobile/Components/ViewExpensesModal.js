import React from 'react';
import { Modal, Button, View, Text } from 'react-native';
import { currencyFormat } from '../Utils';
import { RemoveExpense } from '../Repository/Database';
import { useAuth } from '../Provider/AuthContext';

export default function ViewExpensesModal({ showModal, budget: budgetName, listOfExpense, handleClose }) {
  const expenses = listOfExpense;
  const { currentUser } = useAuth();

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20 }}>Expenses - {budgetName?.name}</Text>
        <Button title="Delete" color="red" onPress={handleClose} />
      </View>
      <View style={{ margin: 10 }}>
        {expenses &&
          expenses.map((expense, index) => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={expense.amount}>
                <Text style={{ fontSize: 16 }}>{expense.description}</Text>
                <Text style={{ fontSize: 18 }}>{currencyFormat.format(expense.amount)}</Text>
                <Button title="Remove" onPress={() => RemoveExpense(currentUser, expense.budgetId, index)} />
              </View>
            );
          })}
      </View>
    </Modal>
  );
}
