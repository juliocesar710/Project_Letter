import { pendingFriendshipService } from "../../services/NetWork/pendingFriendshipService.js";

export const getPendingFriendships = async (req, res) => {
  try {
    const userId = req.user.id;

    const pendingFriendships = await pendingFriendshipService.getPendingFriendships(userId);

    res.status(200).json(pendingFriendships);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 