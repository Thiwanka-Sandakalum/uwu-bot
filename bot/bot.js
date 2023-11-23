const TelegramBot = require('node-telegram-bot-api');
const { today_timetable, upcoming_lecture, ongoing_lecture } = require('../controller/timetable_controler');

const token = '6973552405:AAGDFim24Yie0aaRqqmnQFXC_WhVz6202n4';
let timetableData = [];
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    const username = msg.chat.first_name;
    console.log(username);

    if (msg.entities && msg.entities[0].type) {
        switch (msg.text) {
            case '/start':
                const wellcome_msg = `Hello ${username} Wellcome to UWU ICT Bot`
                bot.sendMessage(chatId, wellcome_msg);
                break;
            case '/today_schedule':
                try {
                    timetableData = await today_timetable();
                    console.log('Timetable Data:', timetableData);

                    // Parse the JSON string into an array
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
                        `).join('')}
                            `;

                            bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
                        } else {
                            bot.sendMessage(chatId, "No timetable data available for today.");
                        }
                    } else {
                        console.error('Invalid timetable data format:', timetableData);
                        bot.sendMessage(chatId, "Error: Invalid timetable data format.");
                    }

                    break;
                } catch (error) {
                    console.log(error);
                    bot.sendMessage(chatId, "Error fetching timetable data.");
                }
                break;

            case '/next_lecture':
                try {
                    const timetableData = await upcoming_lecture();


                    let responseMessage = `
                    **Next Lecture**

                        - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
                        - **Location:** ${timetableData.Location}
                        - **Course:** ${timetableData.Courses.CourseName}
                        - **Lecturer:** ${timetableData.Courses.LecturerName}
                                `
                    bot.sendMessage(chatId, responseMessage, { parse_mode: 'Markdown' });
                }
                catch (error) {
                    console.error(error);
                    bot.sendMessage(chatId, "Error fetching timetable data.");
                }

                break

            // Add more cases for other commands if needed


            case '/ongoing_lecture':
                try {
                    const ongoing_lecture_data = await ongoing_lecture();

                    console.log(ongoing_lecture_data)
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
                    console.error(error);
                    bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
                }
            // Add more cases for other commands if needed


            default:
                bot.sendMessage(chatId, "this is wrong command")
                break;
        }
    }
});
