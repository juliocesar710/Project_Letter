import { likeDeleteRepository } from "../../repositories/Like/likeDeleteRepository.js";
import { likeRepository } from "../../repositories/Like/likePostRepository.js";

export const likeDeleteService = {
  async unlikePost(userId, postId) {
    const existingLike = await likeRepository.findLike(userId, postId);
    if (!existingLike) {
      throw new Error("Você ainda não curtiu este post.");
    }

    await likeDeleteRepository.deleteLike(userId, postId);

    await likeDeleteRepository.decrementPostLikes(postId);

    return { message: "Like removido com sucesso!" };
  },
};