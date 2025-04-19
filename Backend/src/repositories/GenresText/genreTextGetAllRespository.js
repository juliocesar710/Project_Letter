import prisma from '../../utils/prismaClient.js';

export const getAllGenresTextRepository = async () => {
  try {
    const genresText = await prisma.genres.findMany({
      select: {
        name: true,
      },
    });

    return genresText.map((item) => ({
      genreName: item.name,
    }));
  } catch (error) {
    console.error('Error fetching all genres text:', error);
    throw new Error('Could not fetch all genres text');
  }
}