const { today_timetable, upcoming_lecture, ongoing_lecture, timetable } = require("../controller/timetable_controler");
const logger = require('../logger/index');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();


const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_ID;

let timetableData = [];
const bot = new TelegramBot(token, { polling: true });


async function sendTimeTable() {

    logger.info("Sending Time Table data...");
    try {
        const timetableData = await timetable();

        if (timetableData.length > 0) {
            let responseMessage = `
                    ${timetableData.map(({ Day , TimeStart, TimeEnd, Location, CourseName , LecturerName }) => `
                    <b>${Day}</b>\n
                    <b>${TimeStart} - ${TimeEnd}</b>\n
                    <b>📚 ${CourseName}</b>
                    <i>👨‍🏫 ${LecturerName}</i>
                    <i>🏫 ${Location}</i>`).join('\n')}`;

            bot.sendMessage(chatId, `<b>Time Table 📅</b>`, { parse_mode: 'HTML' });

            bot.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });
        } else {
            bot.sendMessage(chatId, "Contact Developer!");
        }


    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}

async function sendTodaySchedule() {
    try {
        logger.info("Sending Today Schedule...");

        timetableData = await today_timetable();


        if (timetableData.length > 0) {
            let responseMessage = `
                    <b>Today Time Table 📅</b>
                    
                    ${timetableData.map(({ TimeStart, TimeEnd, Location, CourseName , LecturerName }) => `
                        <b>${TimeStart} - ${TimeEnd}</b>\n
                        <b>📚 ${CourseName}</b>
                        <i>👨‍🏫 ${LecturerName}</i>
                        <i>🏫 ${Location}</i>
                    `).join('\n')}`;

            bot.sendMessage(chatId, responseMessage, { parse_mode: "HTML" });
        } else {
            bot.sendMessage(chatId, "No timetable data available for today.");
        }


    } catch (error) {
        logger.error(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}


async function sendNextLecture() {
    try {

        logger.info("Sending Upcomming Lecture data...");

        const timetableData = await upcoming_lecture();


        if (timetableData !== null) {
            let responseMessage = `
            **Next Lecture**

            - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
            - **Location:** ${timetableData.Location}
            - **Course:** ${timetableData.CourseName}
            - **Lecturer:** ${timetableData.LecturerName}`;

            bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
        }
        else {
            // bot.sendMessage(chatId, "there are no any lecture for today", { parse_mode: 'Markdown' });
        }
    }
    catch (error) {
        logger.error(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}


async function sendOngoingLecture() {

    try {

        logger.info("Sending Ongoing Lecture data...");
        const ongoing_lecture_data = await ongoing_lecture();

        if (ongoing_lecture_data !== null) {
            let responseMessage = `
            **Ongoing Lecture**
            - *${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}*
            - **Location:** ${ongoing_lecture_data.Location}
            - **Course:** ${ongoing_lecture_data.CourseName}
            - **Lecturer:** ${ongoing_lecture_data.LecturerName}`
            
            bot.sendMessage(chatId, responseMessage, { parse_mode: "Markdown" });
        }
        else {
            bot.sendMessage(chatId, "There is no any lecture at this time", { parse_mode: 'Markdown' });
        }

    }
    catch (error) {
        logger.error(error);
        bot.sendMessage(chatId, "Error fetching timetable data.");
    }
}

module.exports = { sendTodaySchedule, sendNextLecture, sendOngoingLecture, sendTimeTable }