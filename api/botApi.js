const { today_timetable, upcoming_lecture, ongoing_lecture, timetable } = require("../controller/timetable_controler");
const logger = require('../logger/index');
const { bot } = require('../bot/bot')
require('dotenv').config();

const chatId = process.env.TELEGRAM_ID;

let timetableData = [];


async function sendTimeTable() {

    logger.info("Sending Time Table data...");
    try {
        const timetableData = await timetable();

        if (timetableData.length > 0) {
            let responseMessage = `
                    ${timetableData.map(({ Day, TimeStart, TimeEnd, Location, CourseName, LecturerName }) => `
                    <b>${Day}</b>\n
                    <b>${TimeStart} - ${TimeEnd}</b>\n
                    <b>📚 ${CourseName}</b>
                    <i>👨‍🏫 ${LecturerName}</i>
                    <i>🏫 ${Location.substring(0,20)}</i>`).join('\n')}`;

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
                    \n
                    ${timetableData.map(({ Day ,TimeStart, TimeEnd, Location, CourseName , LecturerName }) => `
                        <b>${TimeStart} - ${TimeEnd}</b>\n
                        <b>📚 ${CourseName}</b>
                        <i>👨‍🏫 ${LecturerName}</i>
                        <i>🏫 ${Location.substring(0,20)}</i>
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
            <b>Next Lecture</b>
            \n
            <b>${timetableData.TimeStart} - ${timetableData.TimeEnd}</b>\n
            <b>📚 ${timetableData.CourseName}</b>
            <i>👨‍🏫 ${timetableData.LecturerName}</i>
            <i>🏫 ${timetableData.Location.substring(0,20)}</i>`;

            bot.sendMessage(chatId, responseMessage, { parse_mode: 'HTML' });
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
            \n
            <b>${ongoing_lecture_data.TimeStart} - ${ongoing_lecture_data.TimeEnd}</b>\n
            <b>📚 ${ongoing_lecture_data.CourseName}</b>
            <i>👨‍🏫 ${ongoing_lecture_data.LecturerName}</i>
            <i>🏫 ${ongoing_lecture_data.Location.substring(0,20)}</i>`
            
            bot.sendMessage(chatId, responseMessage, { parse_mode: "HTML" });
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