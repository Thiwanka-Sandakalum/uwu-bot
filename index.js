const express  = require("express");

const app = express();


const PORT = process.env.PORT | 3000



app.listen(PORT , () => {
    console.log(`Bot is started running on the server at PORT ${PORT}`);
});