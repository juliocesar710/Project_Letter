import { getAllPostsByUserRepository } from "../../repositories/Posts/postGetAllUserRepository.js";

export const getAllPostsByUserService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const posts = await getAllPostsByUserRepository(userId);

  if (!posts || posts.length === 0) {
    throw new Error("No posts found for this user");
  }

  return posts;
};