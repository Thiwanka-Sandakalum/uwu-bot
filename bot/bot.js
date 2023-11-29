const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logger/index');
const { today_timetable, upcoming_lecture, ongoing_lecture } = require('../controller/timetable_controler');
require('dotenv').config();
const cron = require('node-cron');
const fs = require("fs").promises;
const path = require('path')

const token = process.env.TELEGRAM_BOT_TOKEN;

let timetableData = [];
const bot = new TelegramBot(token, { polling: true });


const filePath = path.resolve(__dirname, '../data.json');


async function UdpdateStudentData(newData) {
    try {

      const fileContent = await fs.readFile(filePath, 'utf-8');

      const existingData = JSON.parse(fileContent);
    
      existingData.students.push(newData);

      const updatedDataString = JSON.stringify(existingData, null, 2);
  
      await fs.writeFile("data.json", updatedDataString, 'utf-8');

      return "Done";


    } catch (error) {
        logger.error('Error reading or writing JSON file:', error.message);
        return new Error(error);
      
    }
}


async function StudentRegistered(id) {
    return new Promise(async(resolve) => {
        const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });

        const {students} = JSON.parse(fileContent);


        if(students.length > 0)
        {
            resolve( students.some(obj => obj.id === id));
        }
        else
        {
            resolve(false);
        }
    })
}


bot.on('message', async (msg) => {
    try {

        const chatId = msg.chat.id;
        const username = msg.chat.first_name;

        const is_registered = await StudentRegistered(chatId);

        if(!is_registered){
            data = {
                name:username ,
                id : chatId
            }

            await UdpdateStudentData(data);
        }

        // message has been received
        logger.info(`bot msg have received from ${username} ID: ${chatId}`);

        if (msg.entities && msg.entities[0].type) {
            switch (msg.text) {
                case '/start':
                    // user has start coversation
                    logger.info(`${msg.chat.id} Joined to the bot`);
                    const welcome_msg = `Hello ${username} Welcome to UWU ICT Bot`;
                    bot.sendMessage(chatId, welcome_msg);
                    break;

                case '/today_schedule':
                    try {
                        // user has requested today's schedule
                        logger.info(`USER: ${msg.chat.id} Requested for today schedule`);
                        timetableData = await today_timetable();
                        logger.info('Timetable Data execute');

                        if (Array.isArray(timetableData)) {

                            if (timetableData.length > 0) {

                                // timetableData = JSON.parse(timetableData);

                                let responseMessage = 
                                `**Today's Timetable**
${timetableData.map(({Day , TimeStart, TimeEnd, Location, CourseName , LecturerName }) => `
**${Day}**
**${TimeStart} - ${TimeEnd}**\n
- **📚 ${CourseName}**
- **👨‍🏫 ${LecturerName}**
- **🏫 ${Location}**`).join('\n')}`;

                                bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });

                                logger.info('Today\'s timetable sent successfully');
                            } else {
                                bot.sendMessage(chatId, "No timetable data available for today.");

                                logger.info('No timetable data available for today.');
                            }
                        } else {
                            logger.error('Invalid timetable data format:', timetableData);
                            bot.sendMessage(chatId, "Error: Invalid timetable data format.");

                            logger.error('Invalid timetable data format:', timetableData);
                        }
                    } catch (error) {
                        logger.error(error);
                        bot.sendMessage(chatId, "Error fetching timetable data.");
                    }
                    break;

                case '/next_lecture':
                    try {
                        // user has requested upcoming lecture
                        logger.info(`USER: ${msg.chat.id} Requested for Upcoming Lecture`);
                        const timetableData = await upcoming_lecture();

                        console.log(timetableData)

                        if (timetableData !== null) {
                            let responseMessage = 
                                `**Next Lecture**\n
**${timetableData.Day}**
**${timetableData.TimeStart} - ${timetableData.TimeEnd}**\n
- **📚 ${timetableData.CourseName}**
- **👨‍🏫 ${timetableData.LecturerName}**
- **🏫 ${timetableData.Location}**`;
                            bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
                        } else {
                            bot.sendMessage(chatId, "There are no any lectures for today", { parse_mode: 'Markdown' });
                        }
                    } catch (error) {
                        logger.error(error);
                        bot.sendMessage(chatId, "Error fetching timetable data.");
                    }
                    break;

                case '/ongoing_lecture':
                    try {
                        logger.info(`USER: ${msg.chat.id} Requested for ongoing lecture`);
                        const ongoing_lecture_data = await ongoing_lecture();


                        logger.info(ongoing_lecture_data);
                        if (ongoing_lecture_data !== null) {
                            let responseMessage = 
                                `**Ongoing Lecture**\n
**${ongoing_lecture_data.Day}**
**${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}**\n
- **📚 ${ongoing_lecture_data.CourseName}**
- **👨‍🏫 ${ongoing_lecture_data.LecturerName}**
- **🏫 ${ongoing_lecture_data.Location}**`;

                            bot.sendMessage(msg.chat.id, responseMessage, { parse_mode: "Markdown" });
                        } else {
                            bot.sendMessage(msg.chat.id, "There is no any ongoing lecture at this time", { parse_mode: 'Markdown' });
                        }
                    } catch (error) {
                        logger.error(error);
                        bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
                    }
                    break;

                default:
                    bot.sendMessage(chatId, "This is the wrong command");
                    logger.warn(`USER ID: ${msg.chat.id} Messed up with the wrong command COMMAND: ${msg.text}`);
                    break;
            }
        }
    } catch (error) {
        logger.error(error);
    }
});


// send massage to clients
async function sendMessage(chatID, data) {
    bot.sendMessage(chatID, data)
}

module.exports = {
    sendMessage,bot
}
