const pino = require('pino');
require('dotenv').config({ path: '.env' });

const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'hostname,pid',
      }
    },
});

module.exports = logger;