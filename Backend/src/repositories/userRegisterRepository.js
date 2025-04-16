import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

export const createUserRepository = async (userData) => {

 
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }
  

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
