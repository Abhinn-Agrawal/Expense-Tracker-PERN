import React, { useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar.jsx";
import styles from "./Transactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions} from "../store/financeSlice";
import { deleteExpense, deleteIncome } from "../service/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../Utils/formatDate";
import { useNavigate } from "react-router-dom";


const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector(
    (state) => state.finance
  );
  const navigate = useNavigate();

  /* -------- FETCH DATA ON MOUNT -------- */
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = async (item) => {
    try {
      if (item.type === "income") {
        await deleteIncome(item.id);
      } else {
        await deleteExpense(item.id);
      }

      dispatch(fetchTransactions());
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };
  

  const handleEdit = (item) => {
    navigate(item.type === "income" ? "/incomes" : "/expense", {
      state: {
        isEdit: true,
        data: item,
      },
    });
  };

  return (
    <>
      <Sidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Transactions</h1>
        </div>

        <div className={styles.list}>
          {loading && <p>Loading transactions...</p>}

          {!loading &&
            transactions.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>Category: {item.category}</p>
                    <p>
                      {item.type === "expense" ? "Spent" : "Received"}:{" "}
                      {item.amount} Rs • Date: {formatDate(item.date)} •{" "}
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.edit}
                    onClick={() => handleEdit(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.delete}
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
