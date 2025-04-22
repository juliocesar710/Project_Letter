import { getAllPostsService } from "../../services/Posts/postGetAllService.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};