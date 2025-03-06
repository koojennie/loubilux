const mongoose = require('mongoose');

const orderLineItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    subPrice: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const OrderLineItem = mongoose.model('OrderLineItem', orderLineItemSchema);

module.exports = OrderLineItem;