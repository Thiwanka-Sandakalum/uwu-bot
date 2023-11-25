// const Client = require('@prisma/client');
// const prisma = new Client.PrismaClient();
// const logger  = require('../logger/index');

// async function getLecture(time, day) {
//     logger.info("find : ", time, day);
//     return new Promise(async (resolve, reject) => {
//         try {
//             await prisma.$connect();
//             const period = await prisma.timetableSlots.findFirst({ where: { TimeStart: time, Day: day }, include: { Courses: true } });
//             await prisma.$disconnect();
//             resolve(period);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }


// async function getSlots(day) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await prisma.$connect();
//             const period = await prisma.timetableSlots.findMany({ where: { Day: day }, include: { Courses: true } });
//             await prisma.$disconnect();
//             resolve(period);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }


// async function GetTodayLectures(today) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await prisma.$connect();
//             const today_lectures = await prisma.timetableSlots.findMany({ where: { Day: today }, include: { Courses: true } });
//             await prisma.$disconnect();
//             resolve(today_lectures);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// async function GetAllLectures() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await prisma.$connect();
//             const all_lectures = await prisma.timetableSlots.findMany({ include: { Courses: true } });
//             await prisma.$disconnect();
//             resolve(all_lectures);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }



// async function RequestNameChange(id, data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await prisma.$connect();
//             const student = await prisma.students.update({ where: { StudentID: id }, data: data });
//             await prisma.$disconnect();
//             resolve(student);
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// module.exports = { getLecture, GetTodayLectures, GetAllLectures, getSlots,RequestNameChange };




// // controllers/timetableController.js
// const { Courses, TimetableSlots, Students } = require('../models/index');

// async function getLecture(time, day) {
//   try {
//     const period = await TimetableSlots.findOne({
//       where: { TimeStart: time, Day: day },
//       include: Courses,
//     });
//     return period;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getSlots(day) {
//   try {
//     const periods = await TimetableSlots.findAll({
//       where: { Day: day },
//       include: Courses,
//     });
//     return periods;
//   } catch (error) {
//     throw error;
//   }
// }

// async function GetTodayLectures(today) {
//   try {
//     const todayLectures = await TimetableSlots.findAll({
//       where: { Day: today },
//       include: Courses,
//     });
//     return todayLectures;
//   } catch (error) {
//     throw error;
//   }
// }

// async function GetAllLectures() {
//   try {
//     const allLectures = await TimetableSlots.findAll({
//       include: Courses,
//     });
//     return allLectures;
//   } catch (error) {
//     throw error;
//   }
// }

// async function RequestNameChange(id, data) {
//   try {
//     const student = await Students.update(data, {
//       where: { StudentID: id },
//     });
//     return student;
//   } catch (error) {
//     throw error;
//   }
// }


// getLecture("10:00:00" , "Monday").then((res) => {
//   console.log(res)
// })

// module.exports = {
//   getLecture,
//   GetTodayLectures,
//   GetAllLectures,
//   getSlots,
//   RequestNameChange,
// };



// controllers/timetableController.js
const db = require('../db');

async function getLecture(time, day) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM TimetableSlots
      WHERE TimeStart = ? AND Day = ?
    `;

    db.get(query, [time, day], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function getSlots(day) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM TimetableSlots
      WHERE Day = ?
    `;

    db.all(query, [day], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function GetTodayLectures(today) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM TimetableSlots
      WHERE Day = ?
    `;

    db.all(query, [today], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function GetAllLectures() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM TimetableSlots
    `;

    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function RequestNameChange(id, data) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE Students
      SET Name = ?
      WHERE StudentID = ?
    `;

    db.run(query, [data.Name, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}


getSlots("Monday").then((res) => {
  console.log(res)
})

module.exports = {
  getLecture,
  GetTodayLectures,
  GetAllLectures,
  getSlots,
  RequestNameChange,
};
