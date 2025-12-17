import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Expense from "./pages/Expense";
import Transactions from "./pages/Transactions";
import styles from "./styles/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
