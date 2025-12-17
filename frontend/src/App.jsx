import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Expense from "./pages/Expense";
import Transactions from "./pages/Transactions";
import Login from "./pages/login";
import Signup from "./pages/signup";

import PrivateRoute from "./Routes/PrivateRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";

import styles from "./styles/App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>

          {/* -------- PUBLIC ROUTES -------- */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* -------- PROTECTED ROUTES -------- */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />

          <Route
            path="/incomes"
            element={
              <PrivateRoute>
                <Incomes />
              </PrivateRoute>
            }
          />

          <Route
            path="/expense"
            element={
              <PrivateRoute>
                <Expense />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
