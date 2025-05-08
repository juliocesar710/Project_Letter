import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsersRepository = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                profileImage: true,
                GenreTextFromUser: {
                    select: {
                        genreText: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return users.map(user => ({
            ...user,
            genres: user.GenreTextFromUser.map(item => item.genreText.name)
        }));

    } catch (error) {
        throw error;
    }
};