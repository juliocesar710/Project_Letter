import { commentGetByPostService } from "../../services/Comment/commentGetByPostService.js";

export const commentGetByPostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentGetByPostService(Number(postId));
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};