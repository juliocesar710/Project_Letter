import { friendshipStatusService } from "../../services/NetWork/friendShipStatusService.js";

export const updateFriendshipStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId, status } = req.body;

    const updatedFriendship = await friendshipStatusService.updateFriendshipStatus(
      userId,
      friendId,
      status
    );

    res.status(200).json(updatedFriendship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};