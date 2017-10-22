var winston = require('winston'),
    config = require('./config');

exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: config.logdir + '/beacon.log',
            json: false,
            datePattern: '.dd-MM-yyyy',
           level: config.logLevel,
           maxsize: 104857600 })
   ],
   exitOnError: false
});