import prisma from "../../utils/prismaClient.js";

export const friendshipRepository = {
  createFriendship: async (userId, friendId) => {
    return await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: "pending", 
      },
    });
  },

  findExistingFriendship: async (userId, friendId) => {
    return await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
  },
};