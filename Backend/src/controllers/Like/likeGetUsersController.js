import { likeGetUsersService } from "../../services/Like/likeGetUsersService.js";

export const getUsersWhoLikedPostController = async (req, res) => {
  try {
    const { postId } = req.params;

    const users = await likeGetUsersService.getUsersWhoLikedPost(
      Number(postId)
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
