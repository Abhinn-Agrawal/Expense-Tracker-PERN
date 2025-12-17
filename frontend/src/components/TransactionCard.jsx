import React from "react";
import styles from "./TransactionCard.module.css";

const TransactionCard = ({ name, amount }) => {
  return (
    <div className={styles.card}>
      <div className={styles.name}>{name}</div>
      <div className={styles.amount}>{amount}</div>
    </div>
  );
};

export default TransactionCard;
