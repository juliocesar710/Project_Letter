import prisma from "../../utils/prismaClient.js";

export const likeRepository = {
  async createLike(userId, postId) {
    return prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  },

  async findLike(userId, postId) {
    return prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId }, 
      },
    });
  },

  async incrementPostLikes(postId) {
    return prisma.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });
  },
};