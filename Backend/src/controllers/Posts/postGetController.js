import { getPostByIdService } from "../../services/Posts/postGetService.js";

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await getPostByIdService(postId);

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};