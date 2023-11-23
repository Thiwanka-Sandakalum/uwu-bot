const express = require("express");
const { upcoming_lecture, ongoing_lecture } = require('./controller/timetable_controler');

const app = express();
const PORT = process.env.PORT | 3000

app.get("/api/upcomming-lecture", async (req, res) => {
    try {

        await upcoming_lecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/ongoing-lecture", async (req, res) => {
    try {

        await ongoing_lecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/time-table", async (req, res) => {
    try {

        await ongoing_lecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.get("/api/today-time-table", async (req, res) => {
    try {

        await ongoing_lecture();
        res.json({ status: "DONE" });
    } catch (error) {
        res.sendStatus(500);
    }
})


app.listen(PORT, () => {
    console.log(`Bot is started running on the server at PORT ${PORT}`);
});