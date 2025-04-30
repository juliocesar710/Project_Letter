import prisma from "../../utils/prismaClient.js";

export const friendshipDeleteRepository = {
  deleteFriendship: async (friendshipId) => {
    return await prisma.friendship.delete({
      where: { id: friendshipId },
    });
  },

  findFriendshipById: async (friendshipId) => {
    return await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });
  }
}; 