const buildProdLogger = require('./prodLogger');
const buildDevLogger = require('./devLogger');
require('dotenv').config();

let logger;
if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

module.exports = logger;
