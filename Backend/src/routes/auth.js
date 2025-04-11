import express from "express";
import { createUser } from "../controllers/userRegisterController.js";
import { getUser } from "../controllers/userLoginController.js";
import { updateUser } from "../controllers/userUpdateController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUser);
router.patch("/update", authMiddleware, updateUser);

export default router;
