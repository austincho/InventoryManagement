const mongoose = require('mongoose');
const logger = require('./logger');

exports.initializeDatabaseConnection = (connection) => {
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => logger.info('Database connection successful'))
    .catch((err) => logger.info(err));
};