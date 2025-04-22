import { createPostRepository } from "../../repositories/Posts/postMakeRepository.js";

export const createPostService = async (userId, postData) => {
  if (!postData.title || !postData.description) {
    throw new Error("Title and description are required");
  }

  const newPost = await createPostRepository(userId, postData);
  return newPost;
};