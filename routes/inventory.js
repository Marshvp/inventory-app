const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/itemController')
const category_controller = require('../controllers/categoryController')

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

// get update item
router.get('/items/:id/update', item_controller.item_update_get)

// post update item
router.post('/items/:id/update', item_controller.item_update_post)

// get one item
router.get('/items/:id', item_controller.item_detail)


// Category Routes

// get all categories
router.get('/categories', category_controller.category_list)

// delete category
router.get('/categories/:id/delete', category_controller.category_delete_get)

// post delete category
router.post('/categories/:id/delete', category_controller.category_delete_post)

// get one category
router.get('/categories/:id', category_controller.items_by_category)

module.exports = router