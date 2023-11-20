import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function GetCourses() {
    return new Promise( async (resolve , reject) => { 
        try {
            await prisma.$connect();

            /// do what ever :/
            resolve("");
            await prisma.$disconnect();
        } catch (error) {
            reject(error);
        }
    })
}