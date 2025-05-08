import prisma from "../../utils/prismaClient.js";

export const createPostRepository = async (userId, postData) => {
  return await prisma.post.create({
    data: {
      ...postData,
      userId,
    },
  });
};