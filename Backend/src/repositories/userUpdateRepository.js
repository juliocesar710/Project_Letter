import prisma from "../utils/prismaClient.js";

export const updateUserRepository = {
  updateGenres: async (userId, genres) => {
    if (genres && genres.length > 0) {
      const existingGenres = await prisma.genres.findMany({
        where: {
          name: { in: genres },
        },
      });

      if (existingGenres.length !== genres.length) {
        throw new Error("Some genres do not exist in the database");
      }

      const genreRelations = existingGenres.map((genre) => ({
        userId,
        genreId: genre.id,
      }));

      await prisma.genresFromUser.createMany({
        data: genreRelations,
        skipDuplicates: true,
      });
    }
  },

  updateUserData: async (userId, userData) => {
    await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  },

  getUserById: async (userId) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },
};