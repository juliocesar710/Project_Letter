import prisma from "../../utils/prismaClient.js";

export const findUserByEmailRepository = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found to here");
  }

  return user;
};
