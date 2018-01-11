const mongoose = require('mongoose');

const ProductScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['male', 'female', 'kids'],
    },
    pricing: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    photo: {
        type: String
    },
    rating: {
        type: String
    }

});
const Product = module.exports = mongoose.model('Product', ProductScheme);
