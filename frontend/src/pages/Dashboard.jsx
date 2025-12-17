import React, { useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar.jsx";
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, fetchIncomes } from "../store/financeSlice";
import formatDate from "../Utils/formatDate.js";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { incomes, expenses, loading } = useSelector(
    (state) => state.finance
  );

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  /* ---------------- DERIVED VALUES ---------------- */
  const totalIncomes = useMemo(
    () => incomes.reduce((sum, i) => sum + i.amount, 0),
    [incomes]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const totalBalance = totalIncomes - totalExpenses;

  /* ---------------- GRAPH DATA ---------------- */
  const sumByDate = (data) =>
    data.reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + item.amount;
      return acc;
    }, {});

  const groupedIncomes = sumByDate(incomes);
  const groupedExpenses = sumByDate(expenses);

  const mergedDates = [
    ...new Set([
      ...Object.keys(groupedIncomes),
      ...Object.keys(groupedExpenses),
    ]),
  ].sort((a, b) => new Date(a) - new Date(b));

  const graphData = {
    labels: mergedDates.map((date) => formatDate(date)),
    datasets: [
      {
        label: "Income",
        data: mergedDates.map((d) => groupedIncomes[d] || null),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.4,
        spanGaps: true,
      },
      {
        label: "Expense",
        data: mergedDates.map((d) => groupedExpenses[d] || null),
        borderColor: "red",
        backgroundColor: "red",
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  /* ---------------- DOUGHNUT DATA ---------------- */
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });

  const chartData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryMap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Sidebar />

      <div className={styles.dashboard}>
        <div className={styles.left}>
          <div className={styles.graph}>
            <Line data={graphData} />
          </div>

          <div className={styles.stats}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Total Income</h3>
              <div className={`${styles.cardValue} ${styles.green}`}>
                {totalIncomes} Rs
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Total Expenses</h3>
              <div className={`${styles.cardValue} ${styles.red}`}>
                {totalExpenses} Rs
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Total Balance</h3>
              <div className={`${styles.cardValue} ${
                totalBalance < 0 ? styles.red : styles.green
                }`}>
                {totalBalance} Rs
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.graph}>
            <Doughnut data={chartData} />
          </div>

          <div className={`${styles.card} ${styles.mt}`}>
            <h3 className={styles.cardTitle}>Salary</h3>
            <div className={styles.cardValue}>
              <div>
                Min:{" "}
                {incomes.length
                  ? Math.min(...incomes.map((i) => i.amount))
                  : 0}{" "}
                Rs
              </div>
              <div>
                Max:{" "}
                {incomes.length
                  ? Math.max(...incomes.map((i) => i.amount))
                  : 0}{" "}
                Rs
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.mt}`}>
            <h3 className={styles.cardTitle}>Expense</h3>
            <div className={styles.cardValue}>
              <div>
                Min:{" "}
                {expenses.length
                  ? Math.min(...expenses.map((e) => e.amount))
                  : 0}{" "}
                Rs
              </div>
              <div>
                Max:{" "}
                {expenses.length
                  ? Math.max(...expenses.map((e) => e.amount))
                  : 0}{" "}
                Rs
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;