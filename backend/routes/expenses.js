import { Router } from "express";
import createExpense from "../controllers/expense/createExpense.js";
import getAllExpenses from "../controllers/expense/getAllExpenses.js";
import deleteExpense from "../controllers/expense/deleteExpense.js";
import updateExpense from "../controllers/expense/updateExpense.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add-expense", auth, createExpense);
router.get("/get-expenses", auth, getAllExpenses);
router.put("/update-expense/:id", auth, updateExpense);
router.delete("/delete-expense/:id", auth, deleteExpense);

export default router;