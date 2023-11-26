const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.sqlite');

async function getLecture(time, day) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM TimetableSlots
      INNER JOIN Courses ON TimetableSlots.CourseCode = Courses.CourseCode
      WHERE TimetableSlots.TimeStart = ? AND TimetableSlots.Day = ?
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
      INNER JOIN Courses ON TimetableSlots.CourseCode = Courses.CourseCode
      WHERE TimetableSlots.Day = ?
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
      INNER JOIN Courses ON TimetableSlots.CourseCode = Courses.CourseCode
      WHERE TimetableSlots.Day = ?
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
      INNER JOIN Courses ON TimetableSlots.CourseCode = Courses.CourseCode
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

module.exports = {
  getLecture,
  GetTodayLectures,
  GetAllLectures,
  getSlots,
  RequestNameChange,
};
