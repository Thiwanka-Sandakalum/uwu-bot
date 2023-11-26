const cron = require('node-cron');
const {bot}=require('./bot');
const { upcoming_lecture, ongoing_lecture, today_timetable, timetable } = require('../controller/timetable_controler');

const chatID = '6275667988';

cron.schedule(' * * * * *', async () => {
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `
                **Next Lecture**

                - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
                - **Location:** ${timetableData.Location}
                - **Course:** ${timetableData.CourseName}
                - **Lecturer:** ${timetableData.LecturerName}
            `;
            console.log((timetableData));
            bot.sendMessage(chatID, responseMessage, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatID, "There are no any lectures for today", { parse_mode: 'Markdown' });
        }
    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatID, "Error fetching timetable data.");
    }
});
