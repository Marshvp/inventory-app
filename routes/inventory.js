const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('inventory_home', { title: 'Inventory' });
})


module.exports = router