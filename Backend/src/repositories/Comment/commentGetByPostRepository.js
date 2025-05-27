import prisma from "../../utils/prismaClient.js";

export const commentGetByPostRepository = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
    },
  });
};