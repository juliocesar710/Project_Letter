import { friendshipService } from "../../services/NetWork/friendShipService.js";

export const updateFriendshipStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendshipId, status } = req.body; 

    const updatedFriendship = await friendshipService.updateFriendshipStatus(friendshipId, userId, status);

    res.status(200).json(updatedFriendship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};