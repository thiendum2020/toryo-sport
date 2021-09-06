const Brand = require('../models/brandModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Create new brand    POST/api/brand
exports.newBrand = catchAsyncErrors(async (req, res, next) => {
    const { name, description } = req.body
    const brand = await Brand.create({
        name, description
    })
    res.status(201).json({
        success: true,
        brand
    })
})

//Get all brands   GET/api/brands
exports.getBrands = catchAsyncErrors(async (req, res, next) => {

    const brands = await Brand.find().sort('name')
    res.status(200).json({
        success: true,
        brands
    })
})

//Get 1 brand by id   GET/api/brand/:id
exports.getBrandById = catchAsyncErrors(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        return next(new ErrorHandler('Brand not found', 404))
    }
    res.status(200).json({
        success: true,
        brand
    })
})

//Get 1 brand by name   GET/api/brand/:name
exports.getBrandByName = catchAsyncErrors(async (req, res, next) => {
    const brand = await Brand.find({ name: req.params.name })
    if (!brand) {
        return next(new ErrorHandler('Brand not found', 404))
    }
    res.status(200).json({
        success: true,
        brand
    })
})
//Update brand      PUT/api/brand
exports.updateBrand = catchAsyncErrors(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        return next(new ErrorHandler('Brand not found', 404))
    }
    else {
        brand.name = req.body.name || brand.name
        brand.description = req.body.description || brand.description

        const updateBrand = await brand.save()
        res.status(200).json({
            success: true,
            updateBrand
        })
    }
})

//Delete brand   DELETE/api/brand/:id
exports.deleteBrand = catchAsyncErrors(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
        return next(new ErrorHandler('Brand not found', 404))
    }
    await brand.remove()

    res.status(200).json({
        success: true,
        message: 'Brand is deleted'
    })
})
