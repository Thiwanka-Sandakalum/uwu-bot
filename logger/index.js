const buildDevLogger = require('../logger/devLogger');
const buildProdLogger = require('../logger/prodLogger');
require('dotenv').config();


let logger = null

if (process.env.NODE_ENV === "development") {
     logger = buildDevLogger()
} else {
     logger = buildProdLogger()
}

module.exports=logger;