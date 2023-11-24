const { GetTodayLectures, getSlots } = require('../services/timetable.services.js');
const now = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


async function upcoming_lecture() {

    console.log("upcoming_lecture");
    try {
        const today = daysOfWeek[now.getDay()];
        const timeSlots = await getSlots(today);
        const currentHour = now.getHours();

        console.log(currentHour);
        const nwest_ones = timeSlots.filter((lecture) => {
            return parseInt(lecture.TimeStart.split(":")[0]) > currentHour;
        });

        const upcoming_lecture_data = nwest_ones.reduce((minObj, currentObj) => {
            return parseInt(currentObj.TimeStart.split(":")[0]) < parseInt(minObj.TimeStart.split(":")[0]) ? currentObj : minObj;
        }, nwest_ones[0]);

        if (upcoming_lecture_data && upcoming_lecture_data.length !== 0) {
            return upcoming_lecture_data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function ongoing_lecture() {

    console.log("ongoing_lecture");
    const today = daysOfWeek[now.getDay()];
    const currentHour = now.getHours();
    const data = await getSlots(today);

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
}

async function today_timetable() {
    try {
        let data = await GetTodayLectures();
        data = JSON.stringify(data);
        bot.sendMessage(msg.chat.id, data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { upcoming_lecture, ongoing_lecture, today_timetable };
