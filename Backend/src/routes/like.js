import express from "express";

import authMiddleware from "../middlewares/auth.js";
import { likeController } from "../controllers/Like/likePostController.js";
import { unlikeController } from "../controllers/Like/likeDeleteController.js";
import { getUsersWhoLikedPostController } from "../controllers/Like/likeGetUsersController.js";
import { getPostsLikedByUserController } from "../controllers/Like/likeGetPostsByUserController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, likeController);
router.delete("/:postId", authMiddleware, unlikeController);
router.get("/:postId/users", authMiddleware, getUsersWhoLikedPostController);
router.get("/user/:userId", authMiddleware, getPostsLikedByUserController);



export default router;