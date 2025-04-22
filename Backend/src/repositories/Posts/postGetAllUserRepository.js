import prisma from "../../utils/prismaClient.js";

export const getAllPostsByUserRepository = async (userId) => {
  return await prisma.post.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};