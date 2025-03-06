const mongoose = require('mongoose');
const Order = require('../models/order.models');
const OrderLineItem = require('../models/orderlineitem.model');
const Cart = require('../models/cart.model');


const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        const { user } = req;
        const { paymentMethod } = req.body;

        
        const cart = await Cart.findOne({ user: user.id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        
        const newOrder = await Order.create([{ 
            user: user.id, 
            totalPrice: cart.totalPrice, 
            orderlineitems: [], 
            paymentMethod 
        }], { session });

        const orderId = newOrder[0]._id; 

        const orderLineItems = await createOrderLineItems(cart.products, orderId, session);

        await Order.findByIdAndUpdate(orderId, { orderlineitems: orderLineItems }, { session });


        await Cart.findOneAndDelete({ user: user.id }, { session });

        await session.commitTransaction(); 
        session.endSession();

        return res.status(201).json({ 
            status: 'success', 
            message: 'Order created successfully', 
            data: { orderId, orderLineItems } 
        });

    } catch (error) {
        await session.abortTransaction(); 
        session.endSession();

        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { user } = req;
        
        const orders = await Order.find({ user: user.id })
            .populate('orderlineitems')
            .lean(); 

        return res.status(200).json({ 
            status: 'success', 
            message: 'Orders retrieved successfully', 
            data: orders 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'orderlineitems',
                select: 'product quantity subPrice' 
            })
            .select('user totalPrice paymentMethod status')
            .lean();

        return res.status(200).json({ 
            status: 'success', 
            message: 'Orders retrieved successfully', 
            data: orders 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ status: 'error', message: 'Invalid order status' });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).lean();
        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Order not found' });
        }

        return res.status(200).json({ 
            status: 'success', 
            message: 'Order status updated successfully', 
            data: order 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};


const createOrderLineItems = async (products, orderId, session) => {
    const orderLineItems = await OrderLineItem.insertMany(
        products.map(product => ({
            orderId,
            product: product.product._id,
            quantity: product.quantity,
            subPrice: product.price
        })), 
        { session }
    );

    return orderLineItems.map(item => item._id);
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };
