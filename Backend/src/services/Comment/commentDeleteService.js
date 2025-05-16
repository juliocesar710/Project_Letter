import prisma from "../../utils/prismaClient.js";
import { commentDeleteRepository } from "../../repositories/Comment/commentDeleteRepository.js";

export const commentDeleteService = async (userId, commentId) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comentário não encontrado.");
  if (comment.userId !== userId) throw new Error("Apenas o autor pode deletar este comentário.");
  return await commentDeleteRepository(commentId);
};