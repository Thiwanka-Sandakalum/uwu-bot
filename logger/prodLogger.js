const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json } = format;

function buildProdLogger() {
    return createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            json()
        ),
        defaultMeta: { service: 'userService' },
        transports: [
            new transports.Console({
                format: combine(
                    format.colorize()
                )
            }),
            new transports.File({
                filename: 'app.log',
                level: 'info',
                format: json()
            }),
            new transports.File({
                filename: 'error.log',
                level: 'error',
                format: json()
            })
        ]
    });
}

module.exports = buildProdLogger;
