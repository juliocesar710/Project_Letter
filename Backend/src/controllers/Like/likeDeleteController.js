import { likeDeleteService } from "../../services/Like/likeDeleteService.js";

export const unlikeController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const result = await likeDeleteService.unlikePost(userId, Number(postId));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
