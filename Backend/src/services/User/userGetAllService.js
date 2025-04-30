import {  getAllUsersRepository } from "../../repositories/User/userGetAllRepository.js";

export const getAllUsersService = async () => {
    try {
        const users = await getAllUsersRepository();
        return users;
    } catch (error) {
        throw error;
    }
}; 