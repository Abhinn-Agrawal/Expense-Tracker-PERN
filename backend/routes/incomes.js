import { Router } from "express";

import createIncome from "../controllers/income/createIncome.js";
import getAllIncomes from "../controllers/income/getAllIncomes.js";
import deleteIncome from "../controllers/income/deleteIncome.js";
import updateIncome from "../controllers/income/updateIncome.js";

const router = Router();

router.get("/get-incomes", getAllIncomes);
router.post("/add-income", createIncome);
router.delete("/delete-income/:id", deleteIncome);
router.put("/update-income/:id", updateIncome);

export default router;