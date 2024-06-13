const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/itemController')

// load home page
router.get('/', item_controller.index);

// get all items
router.get('/items', item_controller.item_list)

// add new item
router.get('/items/add', item_controller.item_create_get)

// post new item
router.post('/items/add', item_controller.item_create_post)

// get delete item
router.get('/items/:id/delete', item_controller.item_delete_get)

// post delete item
router.post('/items/:id/delete', item_controller.item_delete_post)

// get one item
router.get('/items/:id', item_controller.item_detail)

module.exports = router