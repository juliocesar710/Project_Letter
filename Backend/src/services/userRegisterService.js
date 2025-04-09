import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (userData) => {
    
    if (!userData.name || !userData.email || !userData.password) {
        throw new Error('Nothing fieds should be empty');
    }

    if(userData.password.length < 6) {
        throw new Error('Password should be at least 6 characters long');
    }

    const existEmail = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    });
    if (existEmail) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        }
    });

    return newUser;
}