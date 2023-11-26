const cron = require('node-cron');
const bot = require('./bot/bot');
const { upcoming_lecture } = require('./controller/timetable_controler');
const api = require('./api/index');
const chatID = '1356513283';


cron.schedule('*/5 * * * * *', async () => {
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `Next Lecture\n
${timetableData.Day}\n
${timetableData.TimeStart} - ${timetableData.TimeEnd}\n
- 📚 ${timetableData.CourseName}
- 👨‍🏫 ${timetableData.LecturerName}
- 🏫 ${timetableData.Location}`;
            bot.sendMessage(chatID, responseMessage, { parse_mode: 'HTML' });
        } else {
            // bot.sendMessage(chatID, "There are no any lectures for today", { parse_mode: 'HTML' });
        }
    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatID, "The Bot is sleeping now");
    }
}, {
    timezone: 'Asia/Colombo'
});