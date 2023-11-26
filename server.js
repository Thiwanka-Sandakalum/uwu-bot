const cron = require('node-cron');
const bot = require('./bot/bot');
const { upcoming_lecture } = require('./controller/timetable_controler');
const api = require('./api/index');
const chatID = '1356513283';


cron.schedule('0 7,8,10,12 * * 1-5', async () => {
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `
                <b>Next Lecture</b>

                <b>${ongoing_lecture_data.Day}</b>\n
                <b>${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}</b>\n
                <b>📚 ${ongoing_lecture_data.CourseName}</b>
                <i>👨‍🏫 ${ongoing_lecture_data.LecturerName}</i>
                <i>🏫 ${ongoing_lecture_data.Location.substring(0,20)} ...</i>
            `;
            bot.sendMessage(chatID, responseMessage, { parse_mode: 'HTML' });
        } else {
            bot.sendMessage(chatID, "There are no any lectures for today", { parse_mode: 'HTML' });
        }
    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatID, "Error fetching timetable data.");
    }
}, {
    timezone: 'Asia/Colombo'
});