import { getAllUsersService } from "../../services/User/userGetAllService.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar usuários"+" aqui" });
    }
}; 