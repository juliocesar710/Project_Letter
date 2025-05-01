import prisma from "../../utils/prismaClient.js";

export const pendingFriendshipRepository = {
  getPendingFriendships: async (userId) => {
    return await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: "pending" },
          { friendId: userId, status: "pending" },
        ],
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, profileImage: true },
        },
        friend: {
          select: { id: true, name: true, email: true, profileImage: true },
        },
      },
    });
  },
}; 