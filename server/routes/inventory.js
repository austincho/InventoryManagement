const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

router.get('/'), async(req, res) => {
    return res.status(200)
}

module.exports = router;
