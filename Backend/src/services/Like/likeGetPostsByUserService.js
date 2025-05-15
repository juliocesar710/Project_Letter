import { likeGetPostsRepository } from "../../repositories/Like/likeGetPostsByUserRepository.js";
import { findUserByIdService } from "../User/userGetByIdService.js";

export const likeGetPostsService = {
  async getPostsLikedByUser(userId) {
    await findUserByIdService(userId);

    const posts = await likeGetPostsRepository.getPostsLikedByUser(userId);

    return posts.map((like) => like.post);
  },
};