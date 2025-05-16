import prisma from "../../utils/prismaClient.js";

export const commentCreateRepository = async (userId, postId, content) => {
  return await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
};