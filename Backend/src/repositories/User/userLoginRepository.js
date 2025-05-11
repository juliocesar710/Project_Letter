import prisma from "../../utils/prismaClient.js";

export const findUserByEmailRepository = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      GenreTextFromUser: {
        include: {
          genreText: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    ...user,
    genreTexts: user.GenreTextFromUser.map((item) => item.genreText.name),
  };
};
