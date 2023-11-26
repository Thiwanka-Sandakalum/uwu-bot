const cron = require('node-cron');
const bot = require('./bot/bot');
const { upcoming_lecture } = require('./controller/timetable_controler');
const api = require('./api/index');
const chatID = '6275667988';


cron.schedule('0 7,8,10,12 * * 1-5', async () => {
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
            bot.sendMessage(chatID, responseMessage, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatID, "There are no any lectures for today", { parse_mode: 'Markdown' });
        }
    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatID, "Error fetching timetable data.");
    }
}, {
    timezone: 'Asia/Colombo'
});