import prisma from "../../utils/prismaClient.js";

export const getPostByIdRepository = async (postId) => {
  return await prisma.post.findUnique({
    where: { id: postId },
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