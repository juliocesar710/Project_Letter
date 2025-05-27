import { likeGetUsersRepository } from "../../repositories/Like/likeGetUsersRepository.js";
import { getPostByIdService } from "../Posts/postGetService.js";

export const likeGetUsersService = {
  async getUsersWhoLikedPost(postId) {
    await getPostByIdService(postId);

    const users = await likeGetUsersRepository.getUsersWhoLikedPost(postId);

    return users.map((like) => like.user);
  },
};
