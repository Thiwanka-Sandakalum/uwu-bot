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

        const currentHour = now.getHours();

        const nwest_ones = timeSlots.filter((lecture) => lecture.TimeStart > currentHour);
        
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
upcoming_lecture();

async function ongoing_lecture() {
    const currentHour = now.getHours();

    const data = await getSlots(today);

    const any_ongoing = data.filter((lecture) => parseInt(lecture.TimeStart.split(":")[0]) <= currentHour && currentHour < lecture.TimeEnd.split(":")[0]);

    if(any_ongoing.length != 0){
        const current_lecture = any_ongoing.reduce((maxObj, currentObj) => {
            return parseInt(currentObj.TimeStart.split(":")[0]) > parseInt(maxObj.TimeStart.split(":")[0]) ? currentObj : maxObj;
        }, any_ongoing[0]);

        return current_lecture;
    }
    else
    {
        return null;
    }
}


function today_timetable() {
    console.log("today time table");
}

function time_table() {
    console.log("return time table");
}


module.exports = { upcoming_lecture, ongoing_lecture, today_timetable, time_table };
