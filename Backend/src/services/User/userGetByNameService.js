import { findUserByNameRepository } from "../../repositories/User/userGetByNameRepository.js";

export const findUserByNameService = async (name) => {
  if (!name) {
    throw new Error("Nome é obrigatório");
  }
  const user = await findUserByNameRepository(name);
  return user;
};