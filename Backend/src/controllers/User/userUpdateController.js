import { updateUserService } from "../../services/User/userUpdateService.js";

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const updatedUser = await updateUserService(userId, data);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};