import { getAllPostsRepository } from "../../repositories/Posts/postGetAllRepository.js";

export const getAllPostsService = async () => {
  const posts = await getAllPostsRepository();

  if (!posts || posts.length === 0) {
    throw new Error("No posts found");
  }

  return posts;
};