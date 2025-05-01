import { friendshipDeleteRepository } from "../../repositories/NetWork/friendShipDeleteRepository.js";

export const friendshipDeleteService = {
  deleteFriendship: async (userId, friendId) => {
    if (!friendId) {
      throw new Error("Friend ID is required");
    }

    const friendship = await friendshipDeleteRepository.findFriendshipByUsers(userId, friendId);

    if (!friendship) {
      throw new Error("Friendship not found");
    }

    if (friendship.userId !== userId && friendship.friendId !== userId) {
      throw new Error("You are not authorized to delete this friendship");
    }

    await friendshipDeleteRepository.deleteFriendship(friendship.id);
    return { message: "Friendship deleted successfully" };
  }
};
