import prisma from "../../utils/prismaClient.js";

export const createPostRepository = async (userId, postData) => {
  return await prisma.post.create({
    data: {
      title: postData.title,
      description: postData.description,
      image: postData.image,
      userId: userId,
      genreTexts: {
        connect: postData.genreTexts.map(genreName => ({ name: genreName }))
      }
    },
    include: {
      genreTexts: true,
    },
  });
};