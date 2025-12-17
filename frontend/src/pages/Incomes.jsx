import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import styles from "./Incomes.module.css";
import { createNewIncome, updateIncome } from "../service/api.js";
import { useLocation, useNavigate } from "react-router-dom";

const Incomes = () => {

  const location = useLocation();
  const navigate = useNavigate(); 
  const isEdit = location.state?.isEdit;
  const editData = location.state?.data;
  const [newIncome, setNewIncome] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Other Income",
    description: "",
  });

   useEffect(() => {
    if (isEdit && editData) {
      setNewIncome({
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
      await updateIncome(editData.id, newIncome);
      navigate("/transactions");
    } else {
      await createNewIncome(newIncome);
    }

    // reset form
    setNewIncome({
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
          <h1>Income</h1>
        </div>

        <div className={styles.content}>
          {/* -------- FORM -------- */}
          <div className={styles.form}>
            <label>
              Income Title
              <input
                type="text"
                value={newIncome.title}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, title: e.target.value })
                }
              />
            </label>

            <label>
              Income Amount
              <input
                type="number"
                value={newIncome.amount}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, amount: e.target.value })
                }
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={newIncome.date}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, date: e.target.value })
                }
              />
            </label>

            <label>
              Category
              <select
                value={newIncome.category}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, category: e.target.value })
                }
              >
                <option value="Salary">Salary</option>
                <option value="Gifts">Gifts</option>
                <option value="Freelance">Freelance</option>
                <option value="Other Income">Other Income</option>
              </select>
            </label>

            <label>
              Description
              <input
                type="text"
                value={newIncome.description}
                onChange={(e) =>
                  setNewIncome({
                    ...newIncome,
                    description: e.target.value,
                  })
                }
              />
            </label>

            <button onClick={handleSubmit}>
              {isEdit ? "Update Income" : "+ Add Income"}
            </button>
          </div>  
        </div>
      </div>
    </>
  );
};

export default Incomes;