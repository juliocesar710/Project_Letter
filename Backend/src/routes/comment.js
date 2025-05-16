import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { commentCreateController } from "../controllers/Comment/commentCreateController.js";
import { commentDeleteController } from "../controllers/Comment/commentDeleteController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, commentCreateController);
router.delete("/:commentId", authMiddleware, commentDeleteController);


export default router;