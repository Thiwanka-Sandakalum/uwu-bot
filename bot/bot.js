const TelegramBot = require('node-telegram-bot-api');
const { today_timetable, upcoming_lecture } = require('../controller/timetable_Controler');

const token = '6973552405:AAGDFim24Yie0aaRqqmnQFXC_WhVz6202n4';
let timetableData = [];
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    console.log(msg);

    if (msg.entities && msg.entities[0].type) {
        switch (msg.text) {
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

                            bot.sendMessage(msg.chat.id, responseMessage, { parse_mode: 'Markdown' });
                        } else {
                            bot.sendMessage(msg.chat.id, "No timetable data available for today.");
                        }
                    } else {
                        console.error('Invalid timetable data format:', timetableData);
                        bot.sendMessage(msg.chat.id, "Error: Invalid timetable data format.");
                    }
                } catch (error) {
                    console.log(error);
                    bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
                }

                break;

            case '/next_lecture':
                try {
                    const timetableData = await upcoming_lecture();

                    let responseMessage = `
                    **Today's Timetable**

                        - *${timetableData.TimeStart} - ${timetableData.TimeEnd}*
                        - **Location:** ${timetableData.Location}
                        - **Course:** ${timetableData.Courses.CourseName}
                        - **Lecturer:** ${timetableData.Courses.LecturerName}
                                `
                    bot.sendMessage(msg.chat.id, responseMessage, { parse_mode: 'Markdown' });
                }
                catch (error) {
                    console.error(error);
                    bot.sendMessage(msg.chat.id, "Error fetching timetable data.");
                }
            // Add more cases for other commands if needed

            default:
                // Handle unknown commands or provide a default response
                break;
        }
    }
});
