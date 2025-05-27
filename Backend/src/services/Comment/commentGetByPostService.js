import { commentGetByPostRepository } from "../../repositories/Comment/commentGetByPostRepository.js";

export const commentGetByPostService = async (postId) => {
  return await commentGetByPostRepository(postId);
};