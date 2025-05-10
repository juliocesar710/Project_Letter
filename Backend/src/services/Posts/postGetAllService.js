import { getAllPostsRepository } from "../../repositories/Posts/postGetAllRepository.js";

export const getAllPostsService = async (filters) => {
  const posts = await getAllPostsRepository(filters);
 
  return posts || [];
};
