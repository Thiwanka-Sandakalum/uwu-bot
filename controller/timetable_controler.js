// timetable_controler.js
const { getLecture, GetTodayLectures, GetAllLectures, getSlots } = require('../services/timetable.services.js');
const now = new Date();

const currentHour = now.getHours()
let upcoming_lec;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = daysOfWeek[now.getDay()];

async function upcoming_lecture() {
    try {
        const timeSlots = await getSlots(today);
        const upcomingSlots = {};

        timeSlots.forEach((slot) => {
            const upcomingSlot_hour = parseInt(slot.TimeStart.split(":")[0], 10);
            upcomingSlots[upcomingSlot_hour] = slot.TimeStart;
        });

        let lectureFound = false;

        for (let key in upcomingSlots) {
            key = parseInt(key);

            if (key > currentHour) {
                console.log(upcomingSlots[key]);

                try {
                    upcoming_lec = await getLecture(upcomingSlots[key], today);
                    console.log(upcoming_lec);

                    if (upcoming_lec == null) {
                        console.log('No upcoming lectures for this hour.');
                    } else {
                        lectureFound = true;
                        break;
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        }

        if (!lectureFound) {
            console.log('No upcoming lectures for today.');
        }
    } catch (error) {
        console.log(error.message);
    }
}
// upcoming_lecture();

function ongoing_lecture() {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    console.log('Ongoing Lecture:', startTimes.find((slot) => {
        const [hour, minute] = slot.split(/: /);
        const slotHour = parseInt(hour);
        const slotMinute = parseInt(minute);

        return currentHour > slotHour || (currentHour === slotHour && currentMinute >= slotMinute);
    }));
}

function today_timetable() {
    console.log("today time table");
}

function time_table() {
    console.log("return time table");
}


module.exports = { upcoming_lecture, ongoing_lecture, today_timetable, time_table };
