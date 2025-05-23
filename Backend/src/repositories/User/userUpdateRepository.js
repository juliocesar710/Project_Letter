import prisma from "../../utils/prismaClient.js";

export const updateUserRepository = {
  // Atualiza gêneros associados ao usuário
  updateGenres: async (userId, genres) => {
    if (!genres || genres.length === 0) {
      return;
    }

    // Busca gêneros existentes no banco
    const existingGenres = await prisma.genreText.findMany({
      where: {
        name: { in: genres },
      },
    });

    if (existingGenres.length !== genres.length) {
      throw new Error("Some genres do not exist in the database");
    }

    // Pega os ids dos gêneros atuais do usuário
    const userGenres = await prisma.genreTextFromUser.findMany({
      where: { userId },
      select: { genreTextId: true },
    });
    const userGenreIds = userGenres.map((rel) => rel.genreTextId);

    // Gêneros novos que precisam ser adicionados
    const newGenreRelations = existingGenres
      .filter((genre) => !userGenreIds.includes(genre.id))
      .map((genre) => ({
        userId,
        genreTextId: genre.id,
      }));

    // Cria novas relações para gêneros não adicionados ainda
    if (newGenreRelations.length > 0) {
      await prisma.genreTextFromUser.createMany({
        data: newGenreRelations,
        skipDuplicates: true,
      });
    }

    // Remova ou comente a parte abaixo para NÃO apagar os antigos:
    // // Opcional: remover gêneros que o usuário não quer mais (sincronizar)
    // const genreIdsToKeep = existingGenres.map((g) => g.id);
    // await prisma.genreTextFromUser.deleteMany({
    //   where: {
    //     userId,
    //     genreTextId: {
    //       notIn: genreIdsToKeep,
    //     },
    //   },
    // });
  },
  // Atualiza dados básicos do usuário (exceto gêneros)
  updateUserData: async (userId, userData) => {
    // Remove genreTexts do userData para evitar erro
    const { genreTexts, ...userFields } = userData;

    // Atualiza os dados simples do usuário
    await prisma.user.update({
      where: { id: userId },
      data: userFields,
    });

    // Se houver gêneros no payload, atualiza relacionamento
    if (genreTexts && Array.isArray(genreTexts)) {
      await updateUserRepository.updateGenres(userId, genreTexts);
    }
  },

  // Busca usuário pelo id
  getUserById: async (userId) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        GenreTextFromUser: {
          include: { genreText: true },
        },
      },
    });
  },
};
