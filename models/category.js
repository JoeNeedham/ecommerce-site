const mongoose = require('mongoose')
const crypto = require('crypto')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 34
    },
},
    { timestamps: true }
);


module.exports = mongoose.model('Category', categorySchema);