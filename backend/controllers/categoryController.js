const Category = require('../models/categoryModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Create new category    POST/api/category
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, description } = req.body
    const category = await Category.create({
        name, description
    })
    res.status(201).json({
        success: true,
        category
    })
})

//Get all categories   GET/api/categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {

    const categories = await Category.find().sort('name')
    res.status(200).json({
        success: true,
        categories
    })
})

//Get 1 category by id   GET/api/category/:id
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }
    res.status(200).json({
        success: true,
        category
    })
})

//Get 1 category by name   GET/api/category/:name
exports.getCategoryByName = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.find({ name: req.params.name })
    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }
    res.status(200).json({
        success: true,
        category
    })
})

//Update category      PUT/api/category
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }
    else {
        category.name = req.body.name || category.name
        category.description = req.body.description || category.description

        const updateCategory = await category.save()
        res.status(200).json({
            success: true,
            updateCategory
        })
    }
})

//Delete Category   DELETE/api/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler('Category not found', 404))
    }
    await category.remove()

    res.status(200).json({
        success: true,
        message: 'Category is deleted'
    })
})
