import { Router } from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;