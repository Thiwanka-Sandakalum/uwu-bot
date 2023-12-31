const { format, transports, createLogger, http } = require('winston');
const { combine, timestamp, label, printf, colorize, errors } = format;

function buildDevLogger() {
    const Format = printf(({ level, message, label, timestamp, stack }) => {
        return `${timestamp} [${label}] ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            label({ label: 'dev_mode!' }),
            timestamp({ format: 'YYYY-MM-dd HH-mm-ss' }),
            errors({ stack: true }),
            Format
        ),
        transports: [
            // new transports.Console({ format: combine(colorize(), Format) }),
            new transports.Console({ format: combine(colorize(), Format),level:'http' })
        ]
    });
}

module.exports = buildDevLogger;
