import { deleteUserService } from "../../services/User/userDeleteService.js";

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await deleteUserService(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};