import express from "express";

import authMiddleware from "../middlewares/auth.js";
import { likeController } from "../controllers/Like/likePostController.js";
import { unlikeController } from "../controllers/Like/likeDeleteController.js";
import { getUsersWhoLikedPostController } from "../controllers/Like/likeGetUsersController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, likeController);
router.delete("/:postId", authMiddleware, unlikeController);
router.get("/:postId/users", authMiddleware, getUsersWhoLikedPostController);//futuramente deve-se pensar se vai ser ou nao publica esta rota



export default router;