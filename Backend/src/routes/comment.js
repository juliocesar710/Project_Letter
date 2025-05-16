import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { commentCreateController } from "../controllers/Comment/commentCreateController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, commentCreateController);

export default router;