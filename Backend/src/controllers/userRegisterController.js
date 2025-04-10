import { createUser } from "../services/userRegisterService.js";
import { generateToken } from "../utils/generateTokenJWT.js";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);

    const token = generateToken(newUser._id);

    res.status(201).json({
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
