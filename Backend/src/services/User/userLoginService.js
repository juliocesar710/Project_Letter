import bcrypt from "bcrypt";

import { findUserByEmailRepository } from "../../repositories/User/userLoginRepository.js";

export const findUser = async (userData) => {
  if (!userData.email || !userData.password) {
    throw new Error("Email and password are required");
  }

  const user = await findUserByEmailRepository(userData.email);

  if (!user) {
    throw new Error("User not found the here");
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};
