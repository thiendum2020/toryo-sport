const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

class Obj {
    constructor(name, sold) {
        this.name = name;
        this.sold = sold;
    }
}
class Obj1 {
    constructor(orderItems) {
        this.orderItems = orderItems;
    }
}
class Obj11 {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
}
class Obj2 {
    constructor(id, totalPrice, orderItems, createdAt) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.orderItems = orderItems;
        this.createdAt = createdAt;
    }
}
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
    const order = await Order.findById(req.params.id)

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

exports.hotProductBetween = catchAsyncErrors(async (req, res) => {
    const { dateFrom, dateTo } = req.body
    if (dateFrom && dateTo) {
        let part1 = dateFrom.split('-')
        let part2 = dateTo.split('-')

        var from = new Date(part1[2], part1[1], part1[0]);
        var to = new Date(part2[2], part2[1], part2[0]);

        let query = {
            "createdAt": {
                $gte: from,
                $lte: to
            }
        }
        const orders = await Order.find(query)
        let arrId = []
        let array = []
        let array2 = []
        let hotProductsByAdmin = []
        let temp = 0
        if (orders) {
            for (let i = 0; i < orders.length; i++) {
                const obj = new Obj1
                obj.orderItems = orders[i].orderItems
                array.push(obj)
            }

            for (let j = 0; j < array.length; j++) {
                for (let k = 0; k < array[j].orderItems.length; k++) {
                    const obj1 = new Obj11
                    obj1.id = array[j].orderItems[k].product;
                    obj1.name = array[j].orderItems[k].name;
                    obj1.quantity = array[j].orderItems[k].quantity;
                    array2.push(obj1)
                }
            }
            for (let a = 0; a < array2.length; a++) {
                temp = arrId.findIndex(ab => ab === array2[a].id.toString())

                if (temp === -1) {
                    const obj = new Obj
                    obj.name = array2[a].name
                    obj.sold = Number(array2[a].quantity)
                    hotProductsByAdmin.push(obj)
                    arrId.push(array2[a].id.toString())
                }
                else {
                    hotProductsByAdmin[temp].sold += Number(array2[a].quantity)
                }
            }
            hotProductsByAdmin.sort(function (a, b) {
                return b.sold - a.sold;
            });
            res.status(200).json({
                success: true,
                hotProductsByAdmin
            })
        } else {
            res.status(404)
            throw new Error('Charts error')
        }
    }
    else {
        res.status(404)
        throw new Error('Charts error here!')
    }
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
    product.sold = product.sold + quantity

    await product.save({ validateBeforeSave: false })
}

async function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

