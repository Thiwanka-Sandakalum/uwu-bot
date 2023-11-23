const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp,errors }) => {
    return `${timestamp} [${label}] ${level}: ${message} ${errors}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'uwu-bot' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' }),
        new transports.File({ filename: 'error.log', level: 'warn' })
    ]
});

logger.info('Application started');


module.exports = logger;
