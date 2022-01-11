const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const { initializeDatabaseConnection } = require('./util/databaseConnection');
const logger = require('./util/logger');
const itemRouter = require('./routes/item');
const app = express();
const path = require('path');
require('dotenv').config({ path: '.env' });

// Database Connection
initializeDatabaseConnection(process.env.MONGODB_CONNECTION);

// Middleware
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API Routes
app.use('/api/item', itemRouter);

// Heroku Post-Build Path
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Server Started on Port ${port}`);
});

module.exports = app;
