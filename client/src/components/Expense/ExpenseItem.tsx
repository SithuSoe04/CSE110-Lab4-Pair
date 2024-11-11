import { Expense } from "../../types/types";
import { AppContext, AppProvider } from "../../context/AppContext";
import { useContext } from "react";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here

  const context = useContext(AppContext);


  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    const updatedExpenseList = context.expenses.filter((expense) => expense.id !== currentExpense.id);
    console.log(updatedExpenseList);
    deleteExpense(currentExpense.id);
    context.setExpenses(updatedExpenseList);
  };

  return (
    <AppProvider>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button data-testid = {`delete-expense-${currentExpense.id}`} onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
    </AppProvider>
  );
};

export default ExpenseItem;
