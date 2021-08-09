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
        user: req.user._id,
    })
    if (order.paymentInfo.name !== 'Ship COD') {
        order.paidAt = Date.now()
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    await order.save()
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
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt')

    res.status(200).json({
        success: true,
        orders
    })

})

//Get all order by admin    GET/api/admin/orders
exports.getAllOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find().sort('-createdAt')
    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount: totalAmount,
        count: orders.length,
        orders
    })

})

//Update process order by admin    PUT/api/admin/order/:id
exports.updateOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivering') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success: true,
    })

})

//UPDATE status order    PUT/api/order/:id
exports.updateStatusOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }
    order.orderStatus = req.body.orderStatus
    if (req.body.orderStatus === 'Received') {
        order.receivedAt = Date.now()
        order.paidAt = Date.now()
    }
    await order.save()

    res.status(201).json({
        success: true
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


