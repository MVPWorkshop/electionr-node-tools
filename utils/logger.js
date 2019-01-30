'use strict';

const winston = require('winston');

module.exports = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.label({ label: 'legalerTools' }),
                winston.format.colorize(),
                winston.format.printf(info => {
                    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
                })
            )
        })
    ]
});