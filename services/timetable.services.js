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
