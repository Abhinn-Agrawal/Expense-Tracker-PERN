import { Router } from "express";
import getAllTransactions from "../controllers/transactions.js";

const router = Router();

// GET /transactions
router.get("/transactions", getAllTransactions);

export default router;
