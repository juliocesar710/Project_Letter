import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { createFriendship } from "../controllers/NetWork/friendShipController.js";
import { updateFriendshipStatus } from "../controllers/NetWork/friendShipStatus.js";
import { getUserFriendships } from "../controllers/NetWork/friendShipGetController.js";
import { deleteFriendship } from "../controllers/NetWork/friendShipDeleteController.js";

const router = express.Router();

router.post("/invite", authMiddleware, createFriendship);
router.patch("/status", authMiddleware, updateFriendshipStatus);
router.get("/get", authMiddleware, getUserFriendships);
router.delete("/delete", authMiddleware, deleteFriendship);

export default router;
