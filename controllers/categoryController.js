const asyncHandler = require('express-async-handler')
const Item = require('../models/items')
const Category = require('../models/category')
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec()

    const categoriesWithCounts = await Promise.all(allCategories.map(async (category) => {
        const itemCount = await Item.countDocuments({ category: category._id }).exec()
        return {
            ...category._doc,
            itemCount: itemCount
        }
    }))

    res.render('category_list', { title: 'Category List', categories: categoriesWithCounts })
})

exports.items_by_category = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id).exec()
    const items = await Item.find({ category: req.params.id }).populate('category').exec()

    res.render('category_detail', { title: 'Category', category: category, items: items })
})

