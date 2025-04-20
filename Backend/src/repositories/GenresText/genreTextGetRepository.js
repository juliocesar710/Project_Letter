import prisma from "../../utils/prismaClient.js";

export const getGenresTextRepository = async (userId) => {
  try {
    const genresText = await prisma.genreTextFromUser.findMany({
      where: {
        userId: userId,
      },
      select: {
        genreText: { 
          select: {
            name: true,
          },
        },
      },
    });

    return genresText.map((item) => ({
      genreName: item.genreText.name, 
    }));
  } catch (error) {
    console.error("Error fetching genres text:", error);
    throw new Error("Could not fetch genres text");
  }
};