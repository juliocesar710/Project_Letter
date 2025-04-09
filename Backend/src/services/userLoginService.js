import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const findUser = async (userData) => {
    console.log("User data:", userData);
    if (!userData.email || !userData.password) {
        throw new Error("Email and password are required");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    return user;
}

