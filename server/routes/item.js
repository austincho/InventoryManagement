const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async(_req, res) => {
    try{
        return Item.find().then(query => res.status(200).json(query));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.post('/add', async(req, res) => {
    try {
        const item = req.body;
        const newItem = new Item(item);
        
        return newItem.save().then(() => {
         res.status(200).json(newItem);
        });
        
    } catch (err){
        return res.status(500).json(err);
    }
});

router.put('/update', async(req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const description = req.body.description;
        const arrivalDate = req.body.arrivalDate;
        const departureDate = req.body.departureDate;
        const owner = req.body.owner;
        const quantity = req.body.quantity;
        
        return Item.updateOne({id_: id}, {
            name: name,
            description: description,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            owner: owner,
            quantity : quantity,
        }).then(() => res.status(200).json({"updated": true}));

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;
        return Item.deleteOne({
            _id: id,
        }).then(() => {res.status(200).json({"deleted": true})});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
