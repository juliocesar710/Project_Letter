import { createPostService } from "../../services/Posts/postMakeService.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id; 
    const postData = req.body;

    const newPost = await createPostService(userId, postData);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};