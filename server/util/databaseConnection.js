const mongoose = require('mongoose');

exports.initializeDatabaseConnection = (connection) => {
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.log(err));
};