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
        min: 0,
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Credit Card", "Bank Transfer", "E-Wallet"],
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: 'Pending',
    },
    shippingAddress: {
        fullName: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String }
    },
    courier: {
        name: { type: String, required: true },
        shippingCost: { type: Number, required: true, min: 0 },
    },
    cancellationReason: {
        type: String,
        default: null,
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;