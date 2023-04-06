import React, { useState, useEffect } from 'react';
import { Button, Container, Text, View } from 'react-native';
import { BudgetCard } from './BudgetCard';
import { AddBudgetModal } from './AddBudgetModal';
import { AddExpenseModal } from './AddExpenseModal';
import { AddBudget, FetchBudgets } from '../Repository/Database';
import { AddExpenseOption } from './AddExpenseOption';
import { ViewExpensesModal } from './ViewExpensesModal';
import { useAuth } from '../Provider/AuthContext';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function RenderingCard() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [showAddExpense, setAddExpense] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [budgetId, setBudgetId] = useState();

  const { currentUser } = useAuth();

  const handleAddBudget = async (name, maximum) => {
    await AddBudget(currentUser, name, maximum);
    setShowAddBudgetModal(false);
  };

  function handleExpenseOption(budgetid) {
    setBudgetId(budgetid);
    setOpenExpenseModal(true);
  }

  const fetchBudgets = async (currentUser) => {
    const getBudget = await FetchBudgets(currentUser);
    setBudgets(getBudget);
  };

  function handleTotalExpense() {
    var total = 0;
    for (var i = 0; i < budgets.length; i++) {
      if (budgets[i].id === budgetId) {
        total += budgets[i].expense[amount];
      }
    }
    setTotalExpense(total);
  }

  useEffect(() => {
    fetchBudgets(currentUser);
    handleTotalExpense();
  }, [currentUser]);

  const amount = 0.5;
  const amountT = 1;

  return (
    <>
      <Container>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20 }}>Budgets</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Add Budget" onPress={() => setShowAddBudgetModal(true)} />
            <Button title="Add Expense" onPress={() => handleExpenseOption()} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ backgroundColor: 'lightgrey', padding: 5, marginRight: 5 }}>
            <Text>Budget: $2000</Text>
          </View>
          <View style={{ backgroundColor: 'green', padding: 5, marginRight: 5 }}>
            <Text>Remaining: $1000</Text>
          </View>
          <View style={{ backgroundColor: 'blue', padding: 5 }}>
            <Text>Spent so far: ${totalExpense}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {budgets.map((budget) => {
            return (
              <BudgetCard
                key={budget.id ?? ''}
                name={budget.name}
                amount={budget.amount}
                max={budget.maximum}
                budgetId={budget.id}
                listOfExpense={budget.expense}
                onAddExpenseClick={() => handleExpenseOption(budget.id)}
              />
            );
          })}
          <BudgetCard name="Total" amount={amount} max={amountT} />
        </View>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
        handleAddBudget={handleAddBudget}
        currentUser={currentUser}
      />
      <AddExpenseOption
        showModal={openExpenseModal}
        setShowModal={setOpenExpenseModal}
        defaultBudgetId={budgetId}
        userId={currentUser}
      />
    </>
  );
        }  
         
