import { deleteUserRepository } from "../../repositories/User/userDeleteRepository.js";

export const deleteUserService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  await deleteUserRepository(userId);
};