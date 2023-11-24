const { today_timetable, upcoming_lecture, ongoing_lecture, timetable } = require("../controller/timetable_controler");
const logger  = require('../logger/index');

async function sendTimeTable() {

    logger.info("Sending Time Table data...");
    try {
        const timetableData = await timetable();

        if (Array.isArray(timetableData)) {
            if (timetableData.length > 0) {
                let responseMessage = `
                    **Today's Timetable**
                    
                    ${timetableData.map(({ TimeStart, TimeEnd, Location, Courses: { CourseName }, Courses: { LecturerName } }) => `
                    - *${TimeStart} - ${TimeEnd}*
                    - **Location:** ${Location}
                    - **Course:** ${CourseName}
                    - **Lecturer:** ${LecturerName}`).join('')}`;

                bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
            } else {
                bot.sendMessage(chatId, "Contact Developer!");
            }
        } else {
            logger.error('Invalid timetable data format:', timetableData);
            bot.sendMessage(chatId, "Error: Invalid timetable data format.");
        }

    } catch (error) {
        logger.log(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}




async function sendTodaySchedule() {
    try {
        logger.info("Sending Today Schedule...");

        timetableData = await today_timetable();


        if (Array.isArray(timetableData)) {
            if (timetableData.length > 0) {
                let responseMessage = `
                    **Today's Timetable**
                    
                    ${timetableData.map(({ TimeStart, TimeEnd, Location, Courses: { CourseName }, Courses: { LecturerName } }) => `
                    - *${TimeStart} - ${TimeEnd}*
                    - **Location:** ${Location}
                    - **Course:** ${CourseName}
                    - **Lecturer:** ${LecturerName}`).join('')}`;

                bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
            } else {
                bot.sendMessage(chatId, "No timetable data available for today.");
            }
        } else {
            logger.error('Invalid timetable data format:', timetableData);
            bot.sendMessage(chatId, "Error: Invalid timetable data format.");
        }

    } catch (error) {
        logger.log(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}


async function sendNextLecture() {
    try {

        logger.info("Sending Upcomming Lecture data...");

        const timetableData = await upcoming_lecture();


        if(timetableData !== null) {
            let responseMessage = `
            **Next Lecture**

            - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
            - **Location:** ${timetableData.Location}
            - **Course:** ${timetableData.Courses.CourseName}
            - **Lecturer:** ${timetableData.Courses.LecturerName}
                        `
            bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
        }
        else
        {
            bot.sendMessage(chatId, "there are no any lecture for today", { parse_mode: 'Markdown' });
        }
    }
    catch (error) {
        logger.error(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}


async function sendOngoingLecture() {
    try {

        logger.info("Sending Ongoing Lecture data...");
        const ongoing_lecture_data = await ongoing_lecture();

        if (ongoing_lecture_data !== null) {
            let responseMessage = `
            **Ongoing Lecture**
            - *${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}*
            - **Location:** ${ongoing_lecture_data.Location}
            - **Course:** ${ongoing_lecture_data.Courses.CourseName}
            - **Lecturer:** ${ongoing_lecture_data.Courses.LecturerName}`
            bot.sendMessage(msg.chat.id, responseMessage, { parse_mode: "Markdown" });
        }
        else {
            bot.sendMessage(msg.chat.id, "There is no any lecture at this time", { parse_mode: 'Markdown' });
        }
    }
    catch (error) {
        logger.error(error);
        bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
    }
}

module.exports = {sendTodaySchedule , sendNextLecture , sendOngoingLecture , sendTimeTable}