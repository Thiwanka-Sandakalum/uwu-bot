const Client = require('@prisma/client');
const prisma = new Client.PrismaClient();
const logger  = require('../logger/index');

async function getLecture(time, day) {
    logger.info("find : ", time, day);
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            // logger.log("this is get lec func ",time,day)
            // const period = await prisma.timetableSlots.findFirst({ where: { TimeStart: "11:00:00", Day: "Wednesday" }, include: { Courses: true } });
            const period = await prisma.timetableSlots.findFirst({ where: { TimeStart: time, Day: day }, include: { Courses: true } });
            await prisma.$disconnect();
            // logger.log(period)
            resolve(period);
        } catch (error) {
            reject(error);
        }
    });
}


async function getSlots(day) {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            const period = await prisma.timetableSlots.findMany({ where: { Day: day }, include: { Courses: true } });
            await prisma.$disconnect();
            resolve(period);
        } catch (error) {
            reject(error);
        }
    });
}


async function GetTodayLectures(today) {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            const today_lectures = await prisma.timetableSlots.findMany({ where: { Day: today }, include: { Courses: true } });
            await prisma.$disconnect();
            resolve(today_lectures);
        } catch (error) {
            reject(error);
        }
    });
}

async function GetAllLectures() {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            const all_lectures = await prisma.timetableSlots.findMany({ include: { Courses: true } });
            await prisma.$disconnect();
            resolve(all_lectures);
        } catch (error) {
            reject(error);
        }
    });
}



async function RequestNameChange(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            await prisma.$connect();
            const student = await prisma.students.update({ where: { StudentID: id }, data: data });
            await prisma.$disconnect();
            resolve(student);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { getLecture, GetTodayLectures, GetAllLectures, getSlots,RequestNameChange };
