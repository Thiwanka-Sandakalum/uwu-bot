// timetable_controler.js
const { getLecture,getSlots } = require('../services/timetable.services.js');

const now = new Date();

const currentHour = now.getHours()


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = daysOfWeek[now.getDay()];

const startTimes = {
    8: '08:00:00',
    9: '09:00:00',
    10: '10:00:00',
    11: '11:00:00',
    12: '12:00:00',
    13: '13:00:00',
    14: '14:00:00',
    15: '15:00:00',
    16: '16:00:00',
};

const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16]

async function upcoming_lecture() {
    let upcomingSlot = null;
    timeSlots = await getSlots(today)

    timeSlots.forEach(async (slot) => {
        if (slot > currentHour && upcomingSlot === null) {
            upcomingSlot = startTimes[slot];
            if (upcomingSlot !== null) {
                const lecture = await getLecture(upcomingSlot, today);
                console.log(lecture)
                // if (lecture) {
                //     console.log('Upcoming Lecture:', upcomingSlot, lecture);
                // }
            } else {
                console.log('No upcoming lectures for today.');
            }
        }
    });

}


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

upcoming_lecture();
// ongoing_lecture();

// module.exports = { upcoming_lecture, ongoing_lecture, today_timetable, time_table };
