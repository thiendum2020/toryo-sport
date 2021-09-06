const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the category name'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Category', categorySchema)