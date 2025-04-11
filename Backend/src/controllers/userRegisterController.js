import { createUserService } from "../services/userRegisterService.js";
import { generateToken } from "../utils/generateTokenJWT.js";

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUserService(userData);

    const token = generateToken(newUser.id);

    res.status(201).json({
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
