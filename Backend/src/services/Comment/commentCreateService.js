import { commentCreateRepository } from "../../repositories/Comment/commentCreateRepository.js";

export const commentCreateService = async (userId, postId, content) => {
  if (!content) {
    throw new Error("O comentário não pode ser vazio.");
  }
  return await commentCreateRepository(userId, postId, content);
};