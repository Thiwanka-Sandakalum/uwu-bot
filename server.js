const cron = require('node-cron');
const bot = require('./bot/bot');
const { upcoming_lecture } = require('./controller/timetable_controler');
const api = require('./api/index');
const fs = require("fs").promises;
const path = require('path')


const filePath = path.resolve(__dirname, 'data.json');

async function GetStudents(){
    return await new Promise(async(resolve) => {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        if(JSON.parse(fileContent).students.length > 0){
            resolve(JSON.parse(fileContent).students);
        }else
        {
            resolve(null);
        }
    })
}

cron.schedule('0 7,8,9,12 * * 1-5', async () => {

    const chatID = await GetStudents();
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `Next Lecture\n
${timetableData.Day}\n
${timetableData.TimeStart} - ${timetableData.TimeEnd}\n
- 📚 ${timetableData.CourseName}
- 👨‍🏫 ${timetableData.LecturerName}
- 🏫 ${timetableData.Location}`;

            chatID.forEach(({id}) => {
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
