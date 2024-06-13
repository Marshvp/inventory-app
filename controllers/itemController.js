
const asyncHandler = require('express-async-handler')
const Item = require('../models/items')

const testItem = new Item({
    name: "Test Item",
    description: "This is a test item",
    category: "Test Category",
    price: 10,
    quantity: 10
})

const testItem2 = new Item({
    name: "Test Item 2",
    description: "This is a test item 2",
    category: "Test Category",
    price: 10,
    quantity: 10
})

exports.index = asyncHandler(async (req, res, next) => {
    const itemList = [testItem, testItem2]

    res.render('inventory_home', { title: 'Inventory', items: itemList })
})

