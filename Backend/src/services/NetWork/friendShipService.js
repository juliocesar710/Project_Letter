import { friendshipRepository } from "../../repositories/NetWork/friendShipRepository.js";

export const friendshipService = {
  createFriendship: async (userId, friendId) => {
    if (!friendId) {
      throw new Error("Friend ID is required");
    }

    const existingFriendship = await friendshipRepository.findExistingFriendship(userId, friendId);
    if (existingFriendship) {
      throw new Error("Friendship already exists");
    }

    const friendship = await friendshipRepository.createFriendship(userId, friendId);
    return friendship;
  },
};