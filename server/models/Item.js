const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:  {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    arrivalDate: { 
        type: Date,
        require: true,
    },
    departureDate: {
        type: Date,
        require: true,
    },
    quantity: {
        type: Number, 
        require: true,
    },
    owner: {
        type: String,
        requrie: true,
    },
  });

module.exports = mongoose.model('Item', itemSchema, 'items');
