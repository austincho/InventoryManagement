
const mongoose = require('mongoose');
const logger = require('../util/logger');
const fs = require('fs');
const Item = require('../models/Item');
const { exit } = require('process');
require('dotenv').config({ path: '.env' });

const DATA_PATH = './server/scripts/itemsData.json';

const insertGeneratedData = () => {
    logger.info('Starting Data Generation Process...');
    const itemData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

    Item.insertMany(itemData, (err) => {
        if (err){
            logger.error(err);
        } else{
            logger.info(`Successfully inserted ${itemData.length} items into the Database.`);
        }
        exit(0)
    });
}

const connection = process.env.MONGODB_CONNECTION;

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  insertGeneratedData();
});