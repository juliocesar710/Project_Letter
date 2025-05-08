import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { createFriendship } from "../controllers/NetWork/friendShipController.js";
import { updateFriendshipStatus } from "../controllers/NetWork/friendShipStatus.js";
import { getUserFriendships } from "../controllers/NetWork/friendShipGetController.js";
import { deleteFriendship } from "../controllers/NetWork/friendShipDeleteController.js";
import { getFriendProfile } from "../controllers/NetWork/friendProfileController.js";
import { getPendingFriendships } from "../controllers/NetWork/pendingFriendshipController.js";

const router = express.Router();

router.post("/invite", authMiddleware, createFriendship);
router.patch("/status", authMiddleware, updateFriendshipStatus);
router.get("/get", authMiddleware, getUserFriendships);
router.get("/pending", authMiddleware, getPendingFriendships);
router.delete("/delete", authMiddleware, deleteFriendship);
router.get("/profile/:friendId", authMiddleware, getFriendProfile);

export default router;
