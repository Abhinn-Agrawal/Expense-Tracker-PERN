import { Router } from "express";
import createIncome from "../controllers/income/createIncome.js";
import getAllIncomes from "../controllers/income/getAllIncomes.js";
import deleteIncome from "../controllers/income/deleteIncome.js";
import updateIncome from "../controllers/income/updateIncome.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/get-incomes", auth, getAllIncomes);
router.post("/add-income", auth, createIncome);
router.delete("/delete-income/:id",auth, deleteIncome);
router.put("/update-income/:id", auth, updateIncome);

export default router;