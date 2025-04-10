import prisma from "../utils/prismaClient";


export const updateUser = async (userId, userData) => {
   

    if (!userId || !userData) {
        throw new Error("User ID and user data are required");
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
    });

    return updatedUser;
}