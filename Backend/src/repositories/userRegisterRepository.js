import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { findUserByEmailRepository } from "./userLoginRepository.js";



export const createUserRepository = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });

  return newUser;
};
