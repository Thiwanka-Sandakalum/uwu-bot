import {PrismaClient} from 'prisma/prisma-client'

const prisma = new PrismaClient()


export async function NextLecture(time){
    return new Promise(async (resolve , reject) => {
        try {
            await prisma.$connect();
            const period = await prisma.timetableSlots.findFirst({where:{TimeStart:time} , include:{Courses:true}})

            await prisma.$disconnect();

            resolve(period)
        } catch (error) {
            reject(error)
        }
    })
}