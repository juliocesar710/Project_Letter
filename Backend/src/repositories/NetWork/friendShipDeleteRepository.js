import prisma from "../../utils/prismaClient.js";

export const friendshipDeleteRepository = {
  deleteFriendship: async (friendshipId) => {
    return await prisma.friendship.delete({
      where: { id: friendshipId },
    });
  },

  findFriendshipByUsers: async (userId, friendId) => {
    return await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });
  }
};
