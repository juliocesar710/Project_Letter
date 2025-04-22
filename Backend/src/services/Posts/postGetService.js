import { getPostByIdRepository } from "../../repositories/Posts/postGetRepository.js";

export const getPostByIdService = async (postId) => {
  const postIdInt = parseInt(postId, 10);

  if (isNaN(postIdInt)) {
    throw new Error("Invalid postId. It must be a number.");
  }

  const post = await getPostByIdRepository(postIdInt);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};