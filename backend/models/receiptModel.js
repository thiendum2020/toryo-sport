const mongoose = require('mongoose')

const receiptSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    receiptItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            image: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            importPrice: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
    totalImportPrice: {
        type: Number,
        required: true,
        default: 0
    },
    supplier: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Receipt', receiptSchema)