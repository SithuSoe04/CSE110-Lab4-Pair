import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const context = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense: Expense = {
      id: (context.expenses.length + 1).toString(),
      description: name,
      cost: cost,
    }
    if (newExpense.cost === 0){
      alert("Cannot add an item with cost of 0")
    }
    else {
      const updatedExpenseList = [...context.expenses, newExpense]
      createExpense(newExpense)
      context.setExpenses(updatedExpenseList);
    }
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            // HINT: onChange={}
            onChange={(e) => {
              setName(e.target.value);
            }}
            data-testid='expense-name-create'
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost ? cost : 0}
            // HINT: onChange={}
            onChange = {(e) => {
              setCost(parseInt(e.target.value));
            }}
            data-testid='expense-cost-create'
          ></input>
        </div>
        <div className="col-sm">
          <button data-testid='expense-save' type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
