const { format, transports,createLogger } = require('winston');
const { combine, timestamp, label, printf, errors } = format;

function buildDevLogger() {
    const Format = printf(({ level, message, label, timestamp, stack }) => {
        return `${timestamp} [${label}] ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            label({ label: 'right meow!' }),
            timestamp({ format: 'YYYY-MM-dd  HH-mm-ss ' }),
            errors({ stack: true }),
            Format
        ),
        transports: [new transports.Console({ format: format.simple() })]
    });
}

module.exports = buildDevLogger;