import { friendshipGetRepository } from "../../repositories/NetWork/friendShipGetRepository.js";

export const friendshipGetService = {
  getUserFriendships: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const friendships = await friendshipGetRepository.getUserFriendships(userId);

    if (!friendships || friendships.length === 0) {
      throw new Error("No friendships found");
    }

    return friendships.map((friendship) => ({
      id: friendship.id,
      status: friendship.status,
      friend:
        friendship.userId === userId
          ? friendship.friend
          : friendship.user, 
    }));
  },
};