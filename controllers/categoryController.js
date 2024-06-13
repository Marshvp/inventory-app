const asyncHandler = require('express-async-handler')
const Item = require('../models/items')
const Category = require('../models/category')
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec()

    const categoriesWithCounts = await Promise.all(allCategories.map(async (category) => {
        const itemCount = await Item.countDocuments({ category: category._id }).exec()
        const categoryObj = {
            ...category._doc,
            itemCount: itemCount
        };
        categoryObj.url = category.url
        return categoryObj
    }))
;


    res.render('category_list', { title: 'Category List', categories: categoriesWithCounts })
})

exports.items_by_category = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id).exec()
    const items = await Item.find({ category: req.params.id }).populate('category').exec()

    res.render('category_detail', { title: 'Category', category: category, items: items })
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category: req.params.id }).exec()
    ])

    if (category == null) {
        const err = new Error('Category not found')
        err.status = 404
        return next(err)
    } else {
        res.render('category_delete', { title: 'Delete Category', category: category, items: items })
    }

})


exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({ category: req.params.id }).exec()
    ])

    if (items.length > 0) {
        res.render('category_delete', { title: 'Delete Category', category: category, items: items })
        return
    } else {
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/inventory/categories')
    }
})