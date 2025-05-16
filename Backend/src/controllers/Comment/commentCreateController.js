import { commentCreateService } from "../../services/Comment/commentCreateService.js";

export const commentCreateController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await commentCreateService(userId, Number(postId), content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};