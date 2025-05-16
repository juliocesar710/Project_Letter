import prisma from "../../utils/prismaClient.js";

export const commentDeleteRepository = async (commentId) => {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
};