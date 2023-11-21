// timetable.services.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getLecture(time) {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            console.log(time);
            const period = await prisma.timetableSlots.findFirst({ where: { TimeStart: time }, include: { Courses: true } });
            await prisma.$disconnect();
            resolve(period);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { getLecture };
