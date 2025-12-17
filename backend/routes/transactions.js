import { Router } from "express";
import getAllTransactions from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = Router();

// GET /transactions
router.get("/transactions", auth, getAllTransactions);

export default router;
