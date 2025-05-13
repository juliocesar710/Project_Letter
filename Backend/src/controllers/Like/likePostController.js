import { likeService } from "../../services/Like/likePostService.js";

export const likeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
     const result = await likeService.likePost(userId, Number(postId));
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
