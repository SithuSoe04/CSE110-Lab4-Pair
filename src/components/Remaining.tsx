import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  let totalBudget = budget;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > totalBudget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  if (totalBudget - totalExpenses < 0){
    alert("You have exceeded your budget!")
  }
  return (
    <div className={`alert ${alertType}`}>
      <span data-testid="remaining-budget">Remaining: ${totalBudget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
