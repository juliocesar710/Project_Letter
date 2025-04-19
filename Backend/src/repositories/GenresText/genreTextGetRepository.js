import prisma from "../../utils/prismaClient.js";

export const getGenresTextRepository = async (userId) => {
  try {
    const genresText = await prisma.genresFromUser.findMany({
      where: {
        userId: userId,
      },
      select: {
        genre: {
          select: {
            name: true, 
          },
        },
      },
    });

    
    return genresText.map((item) => ({
      genreName: item.genre.name,
    }));
  } catch (error) {
    console.error("Error fetching genres text:", error);
    throw new Error("Could not fetch genres text");
  }
};