import { Router } from "express";
import createExpense from "../controllers/expense/createExpense.js";
import getAllExpenses from "../controllers/expense/getAllExpenses.js";
import deleteExpense from "../controllers/expense/deleteExpense.js";
import updateExpense from "../controllers/expense/updateExpense.js";

const router = Router();

router.post("/add-expense", createExpense);
router.get("/get-expenses", getAllExpenses);
router.delete("/delete-expense/:id", deleteExpense);
router.put("/update-expense/:id", updateExpense);

export default router;