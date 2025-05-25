import { createUserRepository } from "../../repositories/User/userRegisterRepository.js";

export const createUserService = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Nothing fieds should be empty");
  }

  if (userData.password.length < 6) {
    throw new Error("Password should be at least 6 characters long");
  }

  const newUser = await createUserRepository(userData);

  return newUser;
};
