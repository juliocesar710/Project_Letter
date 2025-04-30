import { friendshipDeleteService } from "../../services/NetWork/friendShipDeleteService.js";

export const deleteFriendship = async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendshipId } = req.body;

    const result = await friendshipDeleteService.deleteFriendship(userId, friendshipId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 