import React, { useState } from 'react';
import { Button, Card } from 'react-native-elements';
import { ProgressBar,Text,View } from 'react-native';
import { currencyFormat } from '../Utils';
import { ViewExpensesModal } from './ViewExpensesModal';

export function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  budgetId,
  listOfExpense,
}) {
  const [showExpenseView, setExpenseView] = useState(false); // ExpenseView Controller

  const handleExpenseView = () => {
    setExpenseView(true); // true
  };

  const setShowExpenseView = () => {
    setExpenseView(true); // true
  };

  // close expensive modal
  const handleCloseExpenseView = () => {
    setExpenseView(false);
  };

  const classNames = [];
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (gray) {
    classNames.push('bg-light');
  }

  return (
    <>
      <Card containerStyle={{ backgroundColor: classNames.join(' ') }}>
        <Card.Title
          style={{ justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'normal', marginBottom: 3 }}>
          <Text style={{ marginRight: 5 }}>{name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text>{currencyFormat.format(amount)}</Text>
            {max && (
              <Text style={{ fontSize: 16, color: 'grey', marginLeft: 5 }}>
                / {currencyFormat.format(max)}
              </Text>
            )}
          </View>
        </Card.Title>
        {max && (
          <ProgressBar
            style={{ borderRadius: 50 }}
            progress={amount / max}
            color={getProgressBarVariant(amount, max)}
          />
        )}
        {!hideButtons && (
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="Add Expense" onPress={onAddExpenseClick} />
            <Button title="View Expenses" onPress={setShowExpenseView} />
          </View>
        )}
      </Card>

      <ViewExpensesModal
        showModal={showExpenseView}
        budget={name}
        listOfExpense={listOfExpense}
        handleClose={handleCloseExpenseView}
      />
    </>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return 'green';
  if (ratio < 0.75) return 'orange';
  return 'red';
}
