import express from "express";

import authMiddleware from "../middlewares/auth.js";
import { likeController } from "../controllers/Like/likePostController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, likeController);

export default router;