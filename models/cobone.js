const mongoose = require('mongoose');

const CoboneScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['percentage', 'product'],
    },
    percentage: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },


});
const Cobone = module.exports = mongoose.model('Cobone', CoboneScheme);
