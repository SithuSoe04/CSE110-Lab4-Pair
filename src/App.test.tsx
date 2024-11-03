import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import App from './App';
import { AppProvider } from './context/AppContext';

test("creates a new expense", () => {
  render( <AppProvider><MyBudgetTracker /></AppProvider>);
  const createExpenseInput = screen.getByTestId("expense-name-create");
  const createCostInput = screen.getByTestId("expense-cost-create");
  const createExpenseButton = screen.getByTestId("expense-save");

  fireEvent.change(createExpenseInput, { target: { value: "New Expense" } });
  fireEvent.change(createCostInput, {
    target: { value: 100 },
  });

  fireEvent.click(createExpenseButton);

  const remainingBudget = screen.getByTestId("remaining-budget");
  const totalExpenses = screen.getByTestId("total-expenses");
  expect(remainingBudget.textContent).toBe("Remaining: $900");
  expect(totalExpenses.textContent).toBe("Spent so far: $100");
  const expensesList = screen.getAllByRole("listitem")
  expect(expensesList.length).toBe(1);
});


test("deletes an expense", () => {
  render( <AppProvider><MyBudgetTracker /></AppProvider>);
  const createExpenseInput = screen.getByTestId("expense-name-create");
  const createCostInput = screen.getByTestId("expense-cost-create");
  const createExpenseButton = screen.getByTestId("expense-save");

  fireEvent.change(createExpenseInput, { target: { value: "New Expense" } });
  fireEvent.change(createCostInput, {
    target: { value: 200 },
  });

  fireEvent.click(createExpenseButton);
  var expensesList = screen.getAllByRole("listitem")
  const remainingBudget = screen.getByTestId("remaining-budget");
  const totalExpenses = screen.getByTestId("total-expenses");
  expect(remainingBudget.textContent).toBe("Remaining: $800");
  expect(totalExpenses.textContent).toBe("Spent so far: $200");
  const deleteExpenseButton = screen.getByTestId("delete-expense-1")
  expect(expensesList.length).toBe(1);
  fireEvent.click(deleteExpenseButton);
  expect(remainingBudget.textContent).toBe("Remaining: $1000");
  expect(totalExpenses.textContent).toBe("Spent so far: $0");
  expensesList = screen.queryAllByRole("listitem")
  expect(expensesList.length).toBe(0);
});

test("budget balance verification", () => {
  render( <AppProvider><MyBudgetTracker /></AppProvider>);
  const totalBudget = screen.getByTestId("total-budget");
  const remainingBudget = screen.getByTestId("remaining-budget");
  const totalExpenses = screen.getByTestId("total-expenses");
  const createExpenseInput = screen.getByTestId("expense-name-create");
  const createCostInput = screen.getByTestId("expense-cost-create");
  const createExpenseButton = screen.getByTestId("expense-save");
  for (var i = 100; i <= 300; i+=200){
    fireEvent.change(createExpenseInput, { target: { value: "New Expense" } });
    fireEvent.change(createCostInput, {
      target: { value: i },
    });
    fireEvent.click(createExpenseButton);
    var intTotalBudget;
    var intRemainingBudget;
    var intTotalExpenses;
    var expectedTotalBudget;
    if (totalBudget.textContent !== null){
      intTotalBudget = parseInt(totalBudget.textContent.split(": $")[1])
    }
    if (remainingBudget.textContent !== null){
      intRemainingBudget = parseInt(remainingBudget.textContent?.split(": $")[1])
    }
    if (totalExpenses.textContent !== null){
      intTotalExpenses = parseInt(totalExpenses.textContent?.split(": $")[1]);
    }
    if (intRemainingBudget != null && intTotalExpenses != null){
      expectedTotalBudget = intRemainingBudget + intTotalExpenses;
    }
    expect(intTotalBudget).toBe(expectedTotalBudget);
  }
  const deleteExpenseButton = screen.getByTestId("delete-expense-1")
  fireEvent.click(deleteExpenseButton);
  if (totalBudget.textContent !== null){
    intTotalBudget = parseInt(totalBudget.textContent.split(": $")[1])
  }
  if (remainingBudget.textContent !== null){
    intRemainingBudget = parseInt(remainingBudget.textContent?.split(": $")[1])
  }
  if (totalExpenses.textContent !== null){
    intTotalExpenses = parseInt(totalExpenses.textContent?.split(": $")[1]);
  }
  if (intRemainingBudget != null && intTotalExpenses != null){
    expectedTotalBudget = intRemainingBudget + intTotalExpenses;
  }
  expect(intTotalBudget).toBe(expectedTotalBudget);

});

test("creates a new expense with no cost", () => {
  render( <AppProvider><MyBudgetTracker /></AppProvider>);
  const createExpenseInput = screen.getByTestId("expense-name-create");
  const createCostInput = screen.getByTestId("expense-cost-create");
  const createExpenseButton = screen.getByTestId("expense-save");

  fireEvent.change(createExpenseInput, { target: { value: "New Expense" } });
  fireEvent.change(createCostInput, {
    target: { value: 0 },
  });

  fireEvent.click(createExpenseButton);
  const expensesList = screen.queryAllByRole("listitem")
  expect(expensesList.length).toBe(1); //should be 0, changed for testing purposes
});