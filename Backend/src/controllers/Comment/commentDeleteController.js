import { commentDeleteService } from "../../services/Comment/commentDeleteService.js";

export const commentDeleteController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;
    await commentDeleteService(userId, Number(commentId));
    res.status(204).send().message("Comment deleted successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};