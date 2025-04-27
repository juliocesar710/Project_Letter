import prisma from "../../utils/prismaClient.js";

export const friendShipStatusRepository = {
  updateFriendshipStatus: async (friendshipId, status) => {
    return await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status },
    });
  },

  findFriendshipById: async (friendshipId) => {
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
    return friendship;
  },

  findFriendshipByUsers: async (userId, friendId) => {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
    return friendship;
  },
};