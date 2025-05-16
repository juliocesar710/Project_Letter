import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { commentCreateController } from "../controllers/Comment/commentCreateController.js";
import { commentDeleteController } from "../controllers/Comment/commentDeleteController.js";
import { commentGetByPostController } from "../controllers/Comment/commentGetByPostController.js";


const router = express.Router();

router.post("/:postId", authMiddleware, commentCreateController);
router.delete("/:commentId", authMiddleware, commentDeleteController);
router.get("/post/:postId", commentGetByPostController);



export default router;