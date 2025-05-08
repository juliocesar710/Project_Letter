import { friendShipStatusRepository } from "../../repositories/NetWork/friendShipStatusRepository.js";

export const friendshipStatusService = {
    updateFriendshipStatus: async (userId, friendId, status) => {
        if (!["accepted", "rejected"].includes(status)) {
          throw new Error("Invalid status. Use 'accepted' or 'rejected'.");
        }
      
        const friendship = await friendShipStatusRepository.findFriendshipByUsers(
          userId,
          friendId
        );
      
        if (!friendship) {
          throw new Error("Friendship not found.");
        }
      
        if (friendship.friendId !== userId) {
          throw new Error("You are not authorized to update this friendship.");
        }
      
        const updatedFriendship =
          await friendShipStatusRepository.updateFriendshipStatus(
            friendship.id,
            status
          );
        return updatedFriendship;
      },

  
};
