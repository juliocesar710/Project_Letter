import express from "express";

import authMiddleware from "../middlewares/auth.js";
import { likeController } from "../controllers/Like/likePostController.js";
import { unlikeController } from "../controllers/Like/likeDeleteController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, likeController);
router.delete("/:postId", authMiddleware, unlikeController);



export default router;