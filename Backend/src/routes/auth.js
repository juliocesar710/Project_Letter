import express from "express";
import { createUser } from "../controllers/userRegisterController.js";
import { getUser } from "../controllers/userLoginController.js";
import { updateUser } from "../controllers/userUpdateController.js";
import { deleteUser } from "../controllers/userDeleteController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUser);
router.patch("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser); 

export default router;
