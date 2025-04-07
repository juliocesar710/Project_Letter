import { createUser } from "../services/userService.js";

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}