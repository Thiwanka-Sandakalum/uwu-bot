const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logger/index');
const { today_timetable, upcoming_lecture, ongoing_lecture } = require('../controller/timetable_controler');
require('dotenv').config();
const cron = require('node-cron');

const token = process.env.TELEGRAM_BOT_TOKEN;

let timetableData = [];
const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const username = msg.chat.first_name;

        console.log(msg);

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

                                let responseMessage =
                                    `**Today's Timetable**

                            ${timetableData.map(({ TimeStart, TimeEnd, Location, CourseName, LecturerName }) => `
                                - *${TimeStart} - ${TimeEnd}*
                                - **Location:** ${Location}
                                - **Course:** ${CourseName}
                                - **Lecturer:** ${LecturerName}`).join('')}`;


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

                        if (timetableData !== null) {
                            let responseMessage = `
                                **Next Lecture**

                                - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
                                - **Location:** ${timetableData.Location}
                                - **Course:** ${timetableData.CourseName}
                                - **Lecturer:** ${timetableData.LecturerName}
                            `;
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
                            let responseMessage = `
                                **Ongoing Lecture**
                                - *${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}*
                                - **Location:** ${ongoing_lecture_data.Location}
                                - **Course:** ${ongoing_lecture_data.CourseName}
                                - **Lecturer:** ${ongoing_lecture_data.LecturerName}
                            `;
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