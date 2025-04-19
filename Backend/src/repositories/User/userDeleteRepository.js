import prisma from "../../utils/prismaClient.js";

export const deleteUserRepository = async (userId) => {
  try {
    
    await prisma.genresFromUser.deleteMany({
        where: {
          userId: userId,
        },
      });
    
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

   

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
};
