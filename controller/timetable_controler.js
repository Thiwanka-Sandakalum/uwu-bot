const { Courses, TimetableSlots, Students } = require('../models');

async function getLecture(time, day) {
  try {
    const period = await TimetableSlots.findOne({
      where: { TimeStart: time, Day: day },
      include: Courses,
    });
    console.log(period); // corrected variable name

    return period;
  } catch (error) {
    throw error;
  }
}

async function getSlots(day) {
  try {
    const periods = await TimetableSlots.findAll({
      where: { Day: day },
      include: Courses,
    });
    console.log(periods); // corrected variable name
    return periods;
  } catch (error) {
    throw error;
  }
}

async function GetTodayLectures(today) {
  try {
    const todayLectures = await TimetableSlots.findAll({
      where: { Day: today },
      include: Courses,
    });
    return todayLectures;
  } catch (error) {
    throw error;
  }
}

async function GetAllLectures() {
  try {
    const allLectures = await TimetableSlots.findAll({
      include: Courses,
    });
    return allLectures;
  } catch (error) {
    throw error;
  }
}

async function RequestNameChange(id, data) {
  try {
    const student = await Students.update(data, {
      where: { StudentID: id },
    });
    return student;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getLecture,
  GetTodayLectures,
  GetAllLectures,
  getSlots,
  RequestNameChange,
};
