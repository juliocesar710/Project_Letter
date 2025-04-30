import prisma from "../../utils/prismaClient.js";

export const findFriendship = async (userId, friendId) => {
  return await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: parseInt(friendId), status: "accepted" },
        { userId: parseInt(friendId), friendId: userId, status: "accepted" }
      ]
    }
  });
};

export const findFriendProfile = async (friendId) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(friendId) },
    select: {
      id: true,
      name: true,
      description: true,
      profileImage: true,
      birthDate: true,
      createdAt: true,
      GenreTextFromUser: {
        select: {
          genreText: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
}; 