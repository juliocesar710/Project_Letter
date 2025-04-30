import { friendshipDeleteRepository } from "../../repositories/NetWork/friendShipDeleteRepository.js";

export const friendshipDeleteService = {
  deleteFriendship: async (userId, friendshipId) => {
    if (!friendshipId) {
      throw new Error("Friendship ID is required");
    }

    const friendship = await friendshipDeleteRepository.findFriendshipById(friendshipId);

    if (!friendship) {
      throw new Error("Friendship not found");
    }

    if (friendship.userId !== userId && friendship.friendId !== userId) {
      throw new Error("You are not authorized to delete this friendship");
    }

    await friendshipDeleteRepository.deleteFriendship(friendshipId);
    return { message: "Friendship deleted successfully" };
  }
}; 