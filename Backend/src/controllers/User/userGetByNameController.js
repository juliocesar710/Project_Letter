import { findUserByNameService } from "../../services/User/userGetByNameService.js";

export const getUserByName = async (req, res) => {
  try {
    const  {name}  = req.body;
    const user = await findUserByNameService(name);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};