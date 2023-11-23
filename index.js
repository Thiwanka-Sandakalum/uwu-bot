const express = require("express");
const { sendTodaySchedule, sendOngoingLecture, sendNextLecture, sendTimeTable } = require("./bot/bot.api");

const app = express();
const PORT = process.env.PORT | 3000

app.get("/api/upcomming-lecture", async (req, res) => {
    try {

        await sendNextLecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/ongoing-lecture", async (req, res) => {
    try {

        await sendOngoingLecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/time-table", async (req, res) => {
    try {

        await sendTimeTable();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/today-time-table", async (req, res) => {
    try {

        await sendTodaySchedule();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.listen(PORT, () => {
    console.log(`Bot is started running on the server at PORT ${PORT}`);
});