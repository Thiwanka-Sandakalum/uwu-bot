const cron = require('node-cron');
const bot = require('./bot/bot');
const { upcoming_lecture } = require('./controller/timetable_controler');
const api = require('./api/index');
const chatID = ['1356513283', '6275667988'];


cron.schedule('0 7,8,9,12 * * 1-5', async () => {
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `Next Lecture\n
${timetableData.Day}\n
${timetableData.TimeStart} - ${timetableData.TimeEnd}\n
- 📚 ${timetableData.CourseName}
- 👨‍🏫 ${timetableData.LecturerName}
- 🏫 ${timetableData.Location}`;

            chatID.forEach(id => {
                console.log('Sending message to chat ID:', id);
                bot.sendMessage(id, responseMessage, { parse_mode: 'HTML' });
            });

        } else {
            return
        }
    } catch (error) {
        chatID.forEach(id => {
            logger.error(error);
            bot.sendMessage(id, "The Bot is sleeping now");
        });
    }
}, {
    timezone: 'Asia/Colombo'
});
