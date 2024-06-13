
const asyncHandler = require('express-async-handler')
const Item = require('../models/items')
const Category = require('../models/category')
const { body, validationResult } = require('express-validator');

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

exports.item_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find({}).populate('category')

    res.render('item_list', { title: 'Item List', items: items })
})

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec()
    if (item == null) {
        const err = new Error('Item not found')
        err.status = 404
        return next(err)
    }
    res.render('item_detail', { title: 'Item Detail', item: item })
})


exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}).exec()
    console.log(categories);
    res.render('item_create', { title: 'Create Item', categories: categories, error: null, data: null})
})

exports.item_create_post = [

    body('name', 'Name must not be empty and longer than 3')
        .trim()
        .isLength({ min : 3}) 
        .escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min : 1 })
        .escape(),
    body('price', 'Price must not be empty.')
        .isFloat()
        .trim()
        .isLength({ gt : 0 })
        .escape(),
    body('quantity', 'Quantity must not be empty.')
        .isInt()
        .trim()
        .isLength({ gt : 0 })
        .escape(),
    body('category').custom((value, { req }) => {
        if(!value && !req.body.newCategory.trim()) {
            throw new Error('Category must not be empty.')
        }
        return true;
    }),

    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        let categoryId;

        if(req.body.newCategory && req.body.newCategory.trim() !== '') {
            const newCat = new Category({
                name: req.body.newCategory,
                description: ""
            })

            await newCat.save()
            categoryId = newCat._id
        } else {
            categoryId = req.body.category
        }

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: categoryId,
            price: req.body.price,
            quantity: req.body.quantity
        })

        if(!errors.isEmpty()) {
            const categories = await Category.find({})
            return res.render('item_create', { 
                title: 'Create Item', 
                categories: categories, 
                error: errors.array(), 
                data: req.body
            })
        } else {
            await item.save()
            console.log(item.url);
            res.redirect(item.url)  
        }
    })
]

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec()

    if(item == null) {
        const err = new Error('Item not found')
        err.status = 404
        return next(err)
    } else {
        res.render('item_delete', { title: 'Delete Item', item: item })
    }
})


exports.item_delete_post = asyncHandler(async (req, res, next) => {

    await Item.findByIdAndDelete(req.params.id)
    res.redirect('/inventory/items')
})