import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import incomeRouter from "./routes/incomes.js";
import expenseRouter from "./routes/expenses.js";
import transactionRouter from "./routes/transactions.js"
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/incomes", incomeRouter);
app.use("/expenses", expenseRouter);
app.use("/transactions", transactionRouter);
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
