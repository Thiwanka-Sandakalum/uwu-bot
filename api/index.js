const express = require("express");
const { sendTodaySchedule, sendOngoingLecture, sendNextLecture, sendTimeTable } = require("./botApi");
const logger = require('../logger/index');

const app = express();
const PORT = process.env.PORT | 3000


app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
});

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
    logger.info(`Bot is started running on the server at PORT ${PORT}`);
});