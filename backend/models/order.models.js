const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderlineitems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderLineItem',
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'CARD'],
        default: 'COD',
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;