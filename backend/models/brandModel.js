const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the brand name'],
        unique: true
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

module.exports = mongoose.model('Brand', brandSchema)