import { likeGetPostsService } from "../../services/Like/likeGetPostsByUserService.js";

export const getPostsLikedByUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await likeGetPostsService.getPostsLikedByUser(Number(userId));
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
