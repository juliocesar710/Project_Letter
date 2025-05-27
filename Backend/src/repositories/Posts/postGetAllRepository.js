import prisma from "../../utils/prismaClient.js";

export const getAllPostsRepository = async ({ genre, userId, title }) => {
  return await prisma.post.findMany({
    where: {
      ...(genre && {
        genreTexts: {
          some: {
            name: {
              contains: genre,
              mode: 'insensitive',
            },
          },
        },
      }),
      ...(userId && {
        userId: Number(userId),
      }),
      ...(title && {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
      genreTexts: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              profileImage: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};''