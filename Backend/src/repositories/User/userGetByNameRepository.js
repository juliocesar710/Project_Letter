import prisma from "../../utils/prismaClient.js";

export const findUserByNameRepository = async (name) => {
  const users = await prisma.user.findMany({
    where: { name },
  });

  if (!users || users.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  return users;
};