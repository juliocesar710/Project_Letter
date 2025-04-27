import { friendshipRepository } from "../../repositories/NetWork/friendShipRepository.js";

export const friendshipService = {
  createFriendship: async (userId, friendId) => {
    if (!friendId) {
      throw new Error("Friend ID is required");
    }

    const existingFriendship =
      await friendshipRepository.findExistingFriendship(userId, friendId);
    if (existingFriendship) {
      throw new Error("Friendship already exists");
    }

    const friendship = await friendshipRepository.createFriendship(
      userId,
      friendId
    );
    return friendship;
  },

  updateFriendshipStatus: async (friendshipId, userId, status) => {
    if (!["accepted", "rejected"].includes(status)) {
      throw new Error("Invalid status. Use 'accepted' or 'rejected'.");
    }

    const friendship = await friendshipRepository.findFriendshipById(
      friendshipId
    );

    if (!friendship) {
      throw new Error("Friendship not found.");
    }

    if (friendship.friendId !== userId) {
      throw new Error("You are not authorized to update this friendship.");
    }

    const updatedFriendship = await friendshipRepository.updateFriendshipStatus(
      friendshipId,
      status
    );
    return updatedFriendship;
  },
};
