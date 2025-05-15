import { findUserByIdService } from "../../services/User/userGetByIdService.js";

export const getUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await findUserByIdService(Number(userId)); 
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};