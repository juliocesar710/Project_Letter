import { deletePostService } from "../../services/Posts/postDeleteService.js";


export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { postId } = req.params;

    const deletedPost = await deletePostService(userId, postId);

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};