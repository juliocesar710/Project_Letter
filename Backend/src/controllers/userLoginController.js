import { findUser } from "../services/userLoginService.js";
import { generateToken } from "../utils/generateTokenJWT.js";

export const getUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await findUser(userData);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
