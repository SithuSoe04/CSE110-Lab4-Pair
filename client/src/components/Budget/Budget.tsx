import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      context.setBudget(budget);
      setEditedBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedBudget, setEditedBudget] = useState(context.budget)
  
    function editClick() {
      setIsEditing(true);
    }

    
    function saveClick() {
      setIsEditing(false); 
      updateBudget(editedBudget);
      context.setBudget(editedBudget);
    }


    function handleInputChange(e: any){
      setEditedBudget(e.target.value);
    }
  

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {/* <div >Budget: ${context.budget}</div> */}
      <input data-testid="total-budget" type="text" value={editedBudget} readOnly={!isEditing} onChange={handleInputChange} style={{backgroundColor: !isEditing ? "#e2e3e5" : "", border: !isEditing ? "none" : "",}}></input>
      {isEditing ? <button onClick={saveClick}>Save</button> : <button onClick={editClick}>Edit</button>}
    </div>
  );
};

export default Budget;
