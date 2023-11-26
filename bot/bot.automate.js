const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const { upcoming_lecture, ongoing_lecture, today_timetable, timetable } = require('../controller/timetable_controler');

const chatID = '6275667988';
const token = '6973552405:AAGDFim24Yie0aaRqqmnQFXC_WhVz6202n4';
const bot = new TelegramBot(token, { polling: true });

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
