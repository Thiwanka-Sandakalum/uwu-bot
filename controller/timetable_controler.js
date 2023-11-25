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

async function ongoing_lecture() {

    try {
        const currentHour = 11;
        const data = await getSlots("Monday");

        const any_ongoing = await data.filter((lecture) => parseInt(lecture.TimeStart.split(":")[0]) <= currentHour && currentHour < parseInt(lecture.TimeEnd.split(":")[0]));

        if (any_ongoing && any_ongoing.length != 0) {
            const current_lecture = await any_ongoing.reduce((maxObj, currentObj) => {
                return parseInt(currentObj.TimeStart.split(":")[0]) > parseInt(maxObj.TimeStart.split(":")[0]) ? currentObj : maxObj;
            }, any_ongoing[0]);

            return current_lecture;
        }
        else {
            return null;
        }
    } catch (error) {
        logger.error(error);
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
