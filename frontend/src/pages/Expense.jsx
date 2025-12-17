import React, { useState, useEffect } from 'react';
import {createNewExpense, updateExpense} from '../service/api.js'
import Sidebar from "../components/Sidebar.jsx";
import styles from "./Expense.module.css";
import { useLocation, useNavigate } from 'react-router-dom';

const Expense = () => {

  const location = useLocation();
  const navigate = useNavigate(); 
  const isEdit = location.state?.isEdit;
  const editData = location.state?.data;

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Other Expenses",
    description: "",
  });

  useEffect(() => {
      if (isEdit && editData) {
        setNewExpense({
          title: editData.title || "",
          amount: editData.amount || "",
          date: editData.date?.split("T")[0] || "",
          category: editData.category || "Other Income",
          description: editData.description || "",
        });
      }
    }, [isEdit, editData]);

  /* ---------------- HANDLERS ---------------- */
  const handleSubmit = async () => {
      if (isEdit) {
        await updateExpense(editData.id, newExpense);
        navigate("/transactions");
      } else {
        await createNewExpense(newExpense);
      }
  
      // reset form
      setNewExpense({
        title: "",
        amount: "",
        date: "",
        category: "Other Income",
        description: "",
      });
  };

  return (
    <>
      <Sidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Expense</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.form}>
            <label>
              Expense Title
              <input
                type="text"
                value={newExpense.title}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, title: e.target.value })
                }
              />
            </label>

            <label>
              Expense Amount
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
              />
            </label>

            <label>
              Category
              <select
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
              >
                <option value="Food">Food</option>
                <option value="Home">Home</option>
                <option value="Transport">Transport</option>
                <option value="Other Expenses">Other Expenses</option>
              </select>
            </label>

            <label>
              Description
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    description: e.target.value,
                  })
                }
              />
            </label>

            <button onClick={handleSubmit}>
              {(isEdit) ? "Update Expense" :"+ Add Expense"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expense;