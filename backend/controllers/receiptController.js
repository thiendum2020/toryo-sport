const User = require('../models/userModel')
const Product = require('../models/productModel')
const Receipt = require('../models/receiptModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock = product.stock + quantity
    await product.save({ validateBeforeSave: false })
}



//Create new receipt    POST/api/receipt/new
exports.newReceipt = catchAsyncErrors(async (req, res, next) => {
    const {
        receiptItems,
        totalImportPrice,
        supplierInfo
    } = req.body

    const receipt = await Receipt.create({
        user: req.user._id,
        receiptItems,
        totalImportPrice,
        supplier: supplierInfo
    })

    receipt.receiptItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    await receipt.save()
    res.status(201).json({
        success: true,
        receipt
    })
})

//Get all receipts   GET/api/admin/receipts
exports.getAllReceipts = catchAsyncErrors(async (req, res, next) => {
    const receipts = await Receipt.find().sort('-createdAt')
    // let totalAmount = 0
    // receipts.forEach(receipt => {
    //     totalAmount += receipt.totalPrice
    // })
    res.status(200).json({
        success: true,
        count: receipts.length,
        receipts
    })

})

//Get single receipt    GET/api/receipt/:id
exports.getReceipt = catchAsyncErrors(async (req, res, next) => {
    const receipt = await Receipt.findById(req.params.id)

    if (!receipt) {
        return next(new ErrorHandler('Receipt not found with this ID', 404))
    }

    res.status(201).json({
        success: true,
        receipt
    })

})
