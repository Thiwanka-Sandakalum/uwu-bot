const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logger/index');
const { today_timetable, upcoming_lecture, ongoing_lecture } = require('../controller/timetable_controler');
require('dotenv').config();


const token = process.env.TELEGRAM_BOT_TOKEN;

let timetableData = [];
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.first_name;
    logger.info(`bot msg have recived from ${username} ID :${chatId}`);

    if (msg.entities && msg.entities[0].type) {
        switch (msg.text) {
            case '/start':
                logger.info(`${msg.chat.id} Joined to the bot`);
                const wellcome_msg = `Hello ${username} Wellcome to UWU ICT Bot`
                bot.sendMessage(chatId, wellcome_msg);
                break;
                
            case '/today_schedule':
                try {
                    logger.info(`USER : ${msg.chat.id} Requested for today schedule`)
                    timetableData = await today_timetable();
                    logger.info('Timetable Data:', timetableData);

                    timetableData = JSON.parse(timetableData);

                    if (Array.isArray(timetableData)) {
                        if (timetableData.length > 0) {
                            let responseMessage = `
                        **Today's Timetable**
        
                        ${timetableData.map(({ TimeStart, TimeEnd, Location, Courses: { CourseName }, Courses: { LecturerName } }) => `
                        - *${TimeStart} - ${TimeEnd}*
                            - **Location:** ${Location}
                            - **Course:** ${CourseName}
                            - **Lecturer:** ${LecturerName}
                                `).join('')}`;

                            bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
                        } else {
                            bot.sendMessage(chatId, "No timetable data available for today.");
                        }
                    } else {
                        logger.error('Invalid timetable data format:', timetableData);
                        bot.sendMessage(chatId, "Error: Invalid timetable data format.");
                    }
                } catch (error) {
                    logger.info(error);
                    bot.sendMessage(chatId, "Error fetching timetable data.");
                }
                break;

            case '/next_lecture':
                try {

                    logger.info(`USER : ${msg.chat.id} Requested for Upcomming Lecture`)
                    const timetableData = await upcoming_lecture();


                    if (timetableData !== null) {
                        let responseMessage = `
                        **Next Lecture**

                        - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
                        - **Location:** ${timetableData.Location}
                        - **Course:** ${timetableData.Courses.CourseName}
                        - **Lecturer:** ${timetableData.Courses.LecturerName}
                                    `
                        bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
                    }
                    else {
                        bot.sendMessage(chatId, "there are no any lecture for today", { parse_mode: 'Markdown' });
                    }
                }
                catch (error) {
                    logger.error(error);
                    bot.sendMessage(chatId, "Error fetching timetable data.");
                }

                break

            case '/ongoing_lecture':
                try {
                    logger.info(`USER : ${msg.chat.id} Requested for ongoing lecture`)
                    const ongoing_lecture_data = await ongoing_lecture();

                    logger.info(ongoing_lecture_data)
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
                break

            default:
                bot.sendMessage(chatId, "this is wrong command");
                logger.warn(`USER ID: ${msg.chat.id} Messed  up with wrong command COMMAND :( ${msg.text} )`)
                break;
        }
    }
});
