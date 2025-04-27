import prisma from "../../utils/prismaClient.js";

export const friendshipGetRepository = {
  getUserFriendships: async (userId) => {
    return await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: "accepted" },
          { friendId: userId, status: "accepted" },
        ],
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        friend: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  },
};