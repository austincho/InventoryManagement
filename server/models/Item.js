const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    arrivalDate: { 
        type: Date,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, 'Quantity must be greater than 0.'],
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
  });

module.exports = mongoose.model('Item', itemSchema, 'items');
