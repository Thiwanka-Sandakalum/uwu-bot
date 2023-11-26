const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logger/index');
const { today_timetable, upcoming_lecture, ongoing_lecture } = require('../controller/timetable_controler');
require('dotenv').config();
const botAutomate=require('../bot/bot.automate');
const cron = require('node-cron');

const token = process.env.TELEGRAM_BOT_TOKEN;

let timetableData = [];
const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const username = msg.chat.first_name;

        console.log(msg);

        // Log that a message has been received
        logger.info(`bot msg have received from ${username} ID: ${chatId}`);

        if (msg.entities && msg.entities[0].type) {
            switch (msg.text) {
                case '/start':
                    // Log that a user has joined the bot
                    logger.info(`${msg.chat.id} Joined to the bot`);
                    const welcome_msg = `Hello ${username} Welcome to UWU ICT Bot`;
                    bot.sendMessage(chatId, welcome_msg);
                    break;

                case '/today_schedule':
                    try {
                        // Log that a user has requested today's schedule
                        logger.info(`USER: ${msg.chat.id} Requested for today schedule`);
                        timetableData = await today_timetable();
                        logger.info('Timetable Data:', timetableData);

                        if (Array.isArray(timetableData)) {

                            if (timetableData.length > 0) {

                                // timetableData = JSON.parse(timetableData);

                                let responseMessage = `

                                    <b>Today's Timetable</b>
                                    ${timetableData.map(({Day , TimeStart, TimeEnd, Location, CourseName , LecturerName }) => `
                                    <b>${Day}</b>\n
                                    <b>${TimeStart} - ${TimeEnd}</b>\n
                                    <b>📚 ${CourseName}</b>
                                    <i>👨‍🏫 ${LecturerName}</i>
                                    <i>🏫 ${Location.substring(0,20)} ...</i>`).join('\n')}`;

                                bot.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });

                                // Log that the response message has been sent
                                logger.info('Today\'s timetable sent successfully');
                            } else {
                                bot.sendMessage(chatId, "No timetable data available for today.");

                                // Log that there is no timetable data available
                                logger.info('No timetable data available for today.');
                            }
                        } else {
                            logger.error('Invalid timetable data format:', timetableData);
                            bot.sendMessage(chatId, "Error: Invalid timetable data format.");

                            // Log that there is an invalid timetable data format
                            logger.error('Invalid timetable data format:', timetableData);
                        }
                    } catch (error) {
                        // Log any errors that occur during fetching timetable data
                        logger.error(error);
                        bot.sendMessage(chatId, "Error fetching timetable data.");
                    }
                    break;

                case '/next_lecture':
                    try {
                        // Log that a user has requested upcoming lecture
                        logger.info(`USER: ${msg.chat.id} Requested for Upcoming Lecture`);
                        const timetableData = await upcoming_lecture();

                        if (timetableData !== null) {
                            let responseMessage = `
                                <b>Next Lecture</b>
                                \n
                                <b>${timetableData.Day}</b>\n
                                <b>${timetableData.TimeStart} - ${timetableData.TimeEnd}</b>\n
                                <b>📚 ${timetableData.CourseName}</b>
                                <i>👨‍🏫 ${timetableData.LecturerName}</i>
                                <i>🏫 ${timetableData.Location.substring(0,20)} ...</i>
                            `;
                            bot.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });
                        } else {
                            bot.sendMessage(chatId, "There are no any lectures for today", { parse_mode: 'Markdown' });
                        }
                    } catch (error) {
                        // Log any errors that occur during fetching timetable data
                        logger.error(error);
                        bot.sendMessage(chatId, "Error fetching timetable data.");
                    }
                    break;

                case '/ongoing_lecture':
                    try {
                        // Log that a user has requested ongoing lecture
                        logger.info(`USER: ${msg.chat.id} Requested for ongoing lecture`);
                        const ongoing_lecture_data = await ongoing_lecture();

                        logger.info(ongoing_lecture_data);
                        if (ongoing_lecture_data !== null) {
                            let responseMessage = `
                                <b>Ongoing Lecture</b>
                                \n
                                <b>${ongoing_lecture_data.Day}</b>\n
                                <b>${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}</b>\n
                                <b>📚 ${ongoing_lecture_data.CourseName}</b>
                                <i>👨‍🏫 ${ongoing_lecture_data.LecturerName}</i>
                                <i>🏫 ${ongoing_lecture_data.Location.substring(0,20)} ...</i>
                            `;
                            bot.sendMessage(msg.chat.id, responseMessage, { parse_mode: "HTML" });
                        } else {
                            bot.sendMessage(msg.chat.id, "There is no any ongoing lecture at this time", { parse_mode: 'Markdown' });
                        }
                    } catch (error) {
                        // Log any errors that occur during fetching timetable data
                        logger.error(error);
                        bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
                    }
                    break;

                default:
                    bot.sendMessage(chatId, "This is the wrong command");
                    // Log that an invalid command has been received
                    logger.warn(`USER ID: ${msg.chat.id} Messed up with the wrong command COMMAND: ${msg.text}`);
                    break;
            }
        }
    } catch (error) {
        // Log any unexpected errors
        logger.error(error);
    }
});


// bot automation
const chatID = '1356513283';

cron.schedule(' * * * * *', async () => {
    try {
        const timetableData = await upcoming_lecture();

        if (timetableData !== null) {
            let responseMessage = `

                <b>Next Lecture</b>
                \n
                <b>${timetableData.Day}</b>\n
                <b>${timetableData.TimeStart} - ${timetableData.TimeEnd}</b>\n
                <b>📚 ${timetableData.CourseName}</b>
                <i>👨‍🏫 ${timetableData.LecturerName}</i>
                <i>🏫 ${timetableData.Location.substring(0,20)} ...</i>
            `;
            console.log((timetableData));
            bot.sendMessage(chatID, responseMessage, { parse_mode: 'Markdown' });
        } else {
            // bot.sendMessage(chatID, "There are no any lectures for today", { parse_mode: 'Markdown' });
        }
    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatID, "Error fetching timetable data.");
    }
});
