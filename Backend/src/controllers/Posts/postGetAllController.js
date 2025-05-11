import { getAllPostsService } from "../../services/Posts/postGetAllService.js";

export const getAllPosts = async (req, res) => {
  try {

    const { genre, userId, title } = req.query;
    const posts = await getAllPostsService({ genre, userId, title });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};