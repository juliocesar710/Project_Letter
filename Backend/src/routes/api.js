import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { createPost } from "../controllers/Posts/postMakeController.js";
import { deletePost } from "../controllers/Posts/postDeleteController.js";
import { getPostById } from "../controllers/Posts/postGetController.js";
import { getAllPostsByUser } from "../controllers/Posts/postGetAllUserController.js";
import { getAllPosts } from "../controllers/Posts/postGetAllController.js";
import { createFriendship } from "../controllers/NetWork/friendShipController.js";
import { updateFriendshipStatus } from "../controllers/NetWork/friendShipStatus.js";
import { getUserFriendships } from "../controllers/NetWork/friendShipGetController.js";

const router = express.Router();

router.post("/post", authMiddleware, createPost);
router.delete("/postDelete/:postId", authMiddleware, deletePost);
router.get("/postGet/:postId", authMiddleware, getPostById);
router.get("/postGetAllUser", authMiddleware, getAllPostsByUser);
router.get("/postGetAll", getAllPosts);

router.post("/friendShip", authMiddleware, createFriendship);
router.patch("/friendShipStatus", authMiddleware, updateFriendshipStatus);
router.get("/friendShipGet", authMiddleware, getUserFriendships);

export default router;
