import prisma from "../../utils/prismaClient.js";

export const getAllPostsRepository = async () => {
  return await prisma.post.findMany({
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