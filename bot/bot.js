const TelegramBot = require('node-telegram-bot-api');
const { upcoming_lecture, ongoing_lecture, today_timetable, time_table } = require('../services/timetable.services')
const { GetTodayLectures } = require('../services/timetable.services');
const token = '6973552405:AAGDFim24Yie0aaRqqmnQFXC_WhVz6202n4';

const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    console.log(msg);
    if (msg.entities && msg.entities[0].type) {
        switch (msg.text) {
            case '/today_schedule':
                try {
                    let data = await GetTodayLectures()
                    data = JSON.stringify(data)
                    console.log(typeof (data))
                    bot.sendMessage(msg.chat.id, data)
                } catch (error) {
                    console.log(error)
                }
                break
            case '/next_lecture':
        }
    }
})


