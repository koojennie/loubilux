const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId : {
        type: String,
        unique: true,
    },
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
    paymentMethod: {
        type: String,
        enum: ["COD", "Credit Card", "Bank Transfer", "E-Wallet"],
        required: true,
    },
    paymentStatus: { // Memisahkan pembayaran lebih detail
        type: String,
        enum: ["Unpaid", "Pending", "Paid", "Failed", "Refunded"],
        default: "Unpaid",
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

orderSchema.pre('validate', async function (next) {
    if (!this.orderId) {
        const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Format: YYYYMMDD
        const orderCount = await mongoose.model('Order').countDocuments({ orderDate: { $gte: new Date().setHours(0, 0, 0, 0) } });
        this.orderId = `ORD-${datePart}-${String(orderCount + 1).padStart(3, '0')}`;
    }
    next();
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;