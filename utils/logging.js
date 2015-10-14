var winston = require('winston');

var newConsoleLogger = function(label) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        colorize: true,
        timestamp: true,
        prettyPrint: true,
        label: label
      })
    ]
  });
};

var newFileLogger = function(label, filename) {
  return new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'debug',
        timestamp: true,
        filename: filename,
        label: label
      })
    ]
  });
};

exports.newConsoleLogger = newConsoleLogger;
exports.newFileLogger = newFileLogger;
