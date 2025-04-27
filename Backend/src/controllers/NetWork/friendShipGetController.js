import { friendshipGetService } from "../../services/NetWork/friendShipGetService.js";

export const getUserFriendships = async (req, res) => {
  try {
    const userId = req.user.id;

    const friendships = await friendshipGetService.getUserFriendships(userId);

    res.status(200).json(friendships);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};