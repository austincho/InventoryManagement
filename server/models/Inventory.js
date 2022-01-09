const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name:  {
      type: String,
      requre: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Quantity: {
      type: Number,
      require: true,
    }

  });

module.exports = mongoose.model('Inventory', inventorySchema, 'inventories');
