const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const logger = require('../util/logger');
const { parseAsync } = require('json2csv');

/* 
Retrieve all Items in Inventory
'GET /api/item/'
Params: N/A
*/
router.get('/', async (_req, res) => {
    try {
        return Item.find().then(query => res.status(200).json(query));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(err);
    }
})

/* 
Add an Item to the Inventory
'POST /api/item/add'
Params: {
    name: String,
    description: String,
    quantity: Number,
    arrivalDate: Date,
    departureDate: Date,
    owner: String,
}
    all fields are required
*/
router.post('/add', async (req, res) => {
    try {
        const item = req.body;
        const newItem = new Item(item);

        return newItem.save().then(() => {
            res.status(201).json(newItem);
        }).catch((err) => {
            if (err.name === 'ValidationError') {
                res.status(400).json(err);
            }
            throw err
        })
    } catch (err) {
        logger.error(err);
        return res.status(500).json(err);
    }
});

/* 
Updates an Item in the Inventory
'PUT /api/item/update'
Params: {
    _id: String,
    name: String,
    description: String,
    quantity: Number,
    arrivalDate: Date,
    departureDate: Date,
    owner: String,
}
    _id field is required, other fields are optional
*/
router.put('/update', async (req, res) => {
    try {
        const id = req.body._id;
        let itemToUpdate = req.body;

        try {
            // Input Cleansing 
            itemToUpdate.hasOwnProperty('_id') ? delete itemToUpdate['_id'] : () => { throw new Error('Please include the _id field for the Item Object you want to update.') };
            if (itemToUpdate.hasOwnProperty('arrivalDate')) itemToUpdate['arrivalDate'] = new Date(itemToUpdate['arrivalDate']).toISOString();
            if (itemToUpdate.hasOwnProperty('departureDate')) itemToUpdate['departureDate'] = new Date(itemToUpdate['departureDate']).toISOString();
            if (itemToUpdate.hasOwnProperty('quantity')) itemToUpdate['quantity'] = new Number(itemToUpdate['quantity']);
            const doc = await Item.findOneAndUpdate({ _id: id }, itemToUpdate, { returnOriginal: false });
            return res.status(200).json({ 'updated': true, 'updatedItem': doc })
        } catch (err) {
            return res.status(400).json(err);
        }
    } catch (err) {
        logger.error(err);
        return res.status(500).json(err);
    }
});

/* 
Deletes an Item in the Inventory
'DELETE /api/item/delete/{id}'
Params: N/A
*/
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        return Item.deleteOne({
            _id: id,
        }).then(() => { res.status(200).json({ 'deleted': true }) }).catch((err) => {
            if (err) res.status(400).json(err);
        })
    } catch (err) {
        logger.error(err);
        return res.status(500).json(err);
    }
});

/* 
Generate CSV of all Items in Inventory
'GET /api/item/csv'
Params: N/A
*/
router.get('/csv', async (_req, res) => {
    try {
        return Item.find().then(query => {
            const fields = Object.keys(Item.schema.tree).filter(field => field !== 'id' && field !== '__v' && field !== '_id')
            const opts = { fields };

            parseAsync(query, opts)
                .then(csv => {
                    res.attachment('inventory.csv');
                    res.contentType('text/csv');
                    res.status(200).json(csv);
                })
                .catch(err => { throw err });
        });
    } catch (err) {
        logger.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
