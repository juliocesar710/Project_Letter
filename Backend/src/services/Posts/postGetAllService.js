import { getAllPostsRepository } from "../../repositories/Posts/postGetAllRepository.js";

export const getAllPostsService = async () => {
  const posts = await getAllPostsRepository();
  console.log("posts: ",posts);
  return posts || [];
};
