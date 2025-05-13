import { likeRepository } from "../../repositories/Like/likePostRepository.js";

export const likeService = {
  async likePost(userId, postId) {
    const existingLike = await likeRepository.findLike(userId, postId);
    if (existingLike) {
      throw new Error("Você já curtiu este post.");
    }

    await likeRepository.createLike(userId, postId);

    await likeRepository.incrementPostLikes(postId);

    return { message: "Post curtido com sucesso!" };
  },
};
