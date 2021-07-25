const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Create new order    POST/api/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: 'no',
        user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order
    })
})

//Get single order    GET/api/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    res.status(201).json({
        success: true,
        order
    })

})

//Get logged in user orders    GET/api/orders/me
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })

})

//Get all order by admin    GET/api/admin/orders
exports.getAllOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrices
    })

    res.status(200).json({
        success: true,
        total: totalAmount,
        count: orders.length,
        orders
    })

})

//Update process order by admin    PUT/api/admin/order/:id
exports.updateOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success: true,
    })

})

//DElete order    DELETE/api/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    await order.remove()

    res.status(201).json({
        success: true
    })

})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
    product.sold = product.sold + quantity

    await product.save({ validateBeforeSave: false })
}


