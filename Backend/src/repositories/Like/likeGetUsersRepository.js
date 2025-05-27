import prisma from "../../utils/prismaClient.js";

export const likeGetUsersRepository = {
  async getUsersWhoLikedPost(postId) {
    return prisma.like.findMany({
      where: { postId },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true, 
          },
        },
      },
    });
  },
};