import { pendingFriendshipRepository } from "../../repositories/NetWork/pendingFriendshipRepository.js";

export const pendingFriendshipService = {
  getPendingFriendships: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const pendingFriendships = await pendingFriendshipRepository.getPendingFriendships(userId);

    return pendingFriendships.map((friendship) => ({
      id: friendship.id,
      status: friendship.status,
      user: friendship.user,
      friend: friendship.friend,
      isIncoming: friendship.friendId === userId
    }));
  },
}; 