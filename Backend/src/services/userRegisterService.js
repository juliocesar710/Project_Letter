import bcrypt from "bcrypt";
import {  createUserRepository } from "../repositories/userRegisterRepository.js";
import { findUserByEmailRepository } from "../repositories/userLoginRepository.js";

export const createUser = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Nothing fieds should be empty");
  }

  if (userData.password.length < 6) {
    throw new Error("Password should be at least 6 characters long");
  }

  const existEmail = await findUserByEmailRepository(userData.email);
  if (existEmail) {
    throw new Error("Email already exists");
  }

 
  const newUser = await createUserRepository(userData);

  return newUser;
};
