const mongoose = require('mongoose');
const logger = require('../util/logger');
const Item = require('../models/Item');
const { exit } = require('process');
require('dotenv').config({ path: '.env' });

const connection = process.env.MONGODB_CONNECTION;

const cleanTestData = () => [
    Item.collection.drop().then(() => {
        logger.info("Dropped all items in Test Database");
        exit(0);
    })
] 
mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    cleanTestData();
})