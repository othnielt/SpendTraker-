import { AddBudget, AddExpense, FetchBudgets } from './firebaseFunctions';

describe('Firebase functions', () => {
  test('AddBudget function should add a budget document to the database', async () => {
    // Arrange
    const currentUser = { uid: '123abc' };
    const name = 'test budget';
    const max = 100;

    // Act
    await AddBudget(currentUser, name, max);

    // Assert
    const budgets = await FetchBudgets(currentUser);
    expect(budgets.length).toBeGreaterThan(0);
    const addedBudget = budgets.find(b => b.name === name && b.maximum === max);
    expect(addedBudget).toBeDefined();
  });

  test('AddExpense function should add an expense document to a budget document in the database', async () => {
    // Arrange
    const currentUser = { uid: '123abc' };
    const budgetID = '456def';
    const description = 'test expense';
    const amount = 50;

    // Act
    await AddExpense(currentUser, budgetID, description, amount);

    // Assert
    const budgets = await FetchBudgets(currentUser);
    expect(budgets.length).toBeGreaterThan(0);
    const budget = budgets.find(b => b.id === budgetID);
    expect(budget).toBeDefined();
    expect(budget.expense.length).toBeGreaterThan(0);
    const addedExpense = budget.expense.find(e => e.description === description && e.amount === amount);
    expect(addedExpense).toBeDefined();
  });
});
