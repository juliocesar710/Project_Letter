import prisma from "../../utils/prismaClient.js";

export const likeGetPostsRepository = {
  async getPostsLikedByUser(userId) {
    return prisma.like.findMany({
      where: { userId },
      select: {
        post: {
          select: {
            id: true,
            title: true,
            description: true,
            image: true,
            likesCount: true,
            createdAt: true,
          },
        },
      },
    });
  },
};