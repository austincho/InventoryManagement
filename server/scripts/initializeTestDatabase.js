const mongoose = require('mongoose');
const logger = require('../util/logger');
const Item = require('../models/Item');
const { exit } = require('process');
require('dotenv').config({ path: '.env' });

const TEST_DATA = [
    {
        name: 'Tesla Model X',
        description: 'Electric Vehicle',
        quantity: 1000,
        arrivalDate: new Date().toISOString().split('T')[0],
        departureDate: new Date().toISOString().split('T')[0],
        company: 'Tesla'
    },
    {
        name: 'Tesla Model S',
        description: 'Sedan Electric Vehicle',
        quantity: 1000,
        arrivalDate: new Date().toISOString().split('T')[0],
        departureDate: new Date().toISOString().split('T')[0],
        company: 'Tesla'
    },
    {
        name: 'Tesla Model 3',
        description: 'Affordable Electric Vehicle',
        quantity: 1000,
        arrivalDate: new Date().toISOString().split('T')[0],
        departureDate: new Date().toISOString().split('T')[0],
        company: 'Tesla'
    },
]

const insertTestData = (data) => {
    Item.insertMany(data, (err) => {
        if (err){
            logger.error(err);
        } else{
            logger.info(`Successfully inserted ${data.length} items into the Database.`);
        }
        exit(0)
    })
}

const connection = process.env.MONGODB_CONNECTION;

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    insertTestData(TEST_DATA);
})