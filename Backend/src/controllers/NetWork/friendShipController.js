import { friendshipService } from "../../services/NetWork/friendShipService.js";

export const createFriendship = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { friendId } = req.body;

    const friendship = await friendshipService.createFriendship(userId, friendId);

    res.status(201).json(friendship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};