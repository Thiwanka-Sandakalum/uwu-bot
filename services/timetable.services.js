// timetable.services.js
const Client = require('@prisma/client');
const prisma = new Client.PrismaClient();

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


getLecture("09:00:00").then((res) => {
    console.log(res);
})

module.exports = { getLecture };
