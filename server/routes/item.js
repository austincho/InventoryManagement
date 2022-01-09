const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async(req, res) => {
    try{
        return Item.find().limit(50).then(query => res.status(200).json({items: query}));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/add', async(req, res) => {
    try {
        const newItem = new Item({
            "name": "Razor",
            "description": "Single Use Razors",
            "owner": "Gillete",
        })
        
        return newItem.save().then(() => {
         res.status(200).json(newItem);
        });
        
    } catch (err){
        return res.status(500).json(err);
    }
});

router.patch('/update:id', async(req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const arrivalDate = req.body.arrivalDate;
        const departureDate = req.body.departureDate;
        const owner = req.body.owner;
        
        return Item.updateOne({id_: id}, {
            name: name,
            description: description,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            owner: owner,
        }).then((updated) => res.status(200).json(updated));

    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete('/delete:{id}', async(req, res) => {
    try {
        const {id} = req.params;
        return CustomPosition.deleteOne({
            _id: id,
        }).then(() => {res.status(200).json({"deleted": true})});
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;
