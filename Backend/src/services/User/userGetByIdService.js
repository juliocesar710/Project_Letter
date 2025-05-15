import { findUserByIdRepository } from "../../repositories/User/userGetByIdRepository.js";

export const findUserByIdService = async (userId) => {
  if (!userId) {
    throw new Error("ID do usuário é obrigatório");
  }

  const user = await findUserByIdRepository(userId);
  return user;
};