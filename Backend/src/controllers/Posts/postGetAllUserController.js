import { getAllPostsByUserService } from "../../services/Posts/postGetAllUserService.js";

export const getAllPostsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await getAllPostsByUserService(userId);

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};