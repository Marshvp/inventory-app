const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController')


// load home page
router.get('/', item_controller.index);





module.exports = router