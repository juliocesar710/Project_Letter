import prisma from "../../utils/prismaClient.js";

export const likeDeleteRepository = {
  async deleteLike(userId, postId) {
    return prisma.like.delete({
      where: {
        userId_postId: { userId, postId }, 
      },
    });
  },

  async decrementPostLikes(postId) {
    return prisma.post.update({
      where: { id: postId },
      data: { likesCount: { decrement: 1 } },
    });
  },
};