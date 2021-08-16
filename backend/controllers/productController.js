const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

//Create new product    POST/api/products
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const { name, price, stock, description, category, brand, images } = req.body
    const product = await Product.create({
        name, price, stock, description, category, brand, images
    })
    res.status(201).json({
        success: true,
        product
    })
})

//Get all product   GET/api/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 6
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find().sort('-createdAt'), req.query).search().filter().pagination(resPerPage)

    let products = await apiFeatures.query
    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})
exports.getFeaturedProducts = catchAsyncErrors(async (req, res, next) => {

    const featuredProducts = await Product.find().sort('-ratings').limit(4)
    res.status(200).json({
        success: true,
        featuredProducts
    })
})
exports.getHotProducts = catchAsyncErrors(async (req, res, next) => {

    const hotProducts = await Product.find().sort('-sold').limit(4)
    res.status(200).json({
        success: true,
        hotProducts
    })
})
exports.getLatestProducts = catchAsyncErrors(async (req, res, next) => {

    const latestProducts = await Product.find().sort('-createdAt').limit(4)
    res.status(200).json({
        success: true,
        latestProducts
    })
})

//Get 1 product   GET/api/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//Update product   PUT/api/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    else {
        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description
        product.category = req.body.category
        product.brand = req.body.brand
        product.stock = req.body.stock
        product.images = req.body.images
        const updatedProduct = await product.save()
        res.status(200).json({
            success: true,
            updatedProduct
        })
    }
    // product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false
    // })

})

//Delete product   DELETE/api/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})

//Create new review     POST/api/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true
    })
})

//Get product reviews   GET/api/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete product reviews   DELETE/api/reviews/:id
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})


// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find().sort('-createdAt')

    res.status(200).json({
        success: true,
        products
    })

})