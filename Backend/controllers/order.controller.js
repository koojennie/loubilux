const Order = require('../models/order.models');
const OrderLineItem = require('../models/orderlineitem.model');
const Cart = require('../models/cart.models');

const createOrder = async(req, res)=>{
    try {
        const {userId} = req.user;
        const {paymentMethod} = req.body;
        const cart = await cart.findOne({user: userId}).populate('products.product');

        if(!cart){
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        const newOrder = new Order({
            user: userId,
            totalPrice: cart.totalPrice,
            orderlineitems: cart.products.map(product => {
                return new OrderLineItem({
                    product: product.product,
                    quantity: product.quantity,
                    subPrice: product.price
                });
            },
            paymentMethod,
            ),
        })

        await newOrder.save();

        await Cart.findOneAndDelete({user: userId});

        return res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
            data: newOrder
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getUserOrders = async(req, res)=>{
    try {
        const {userId} = req.user;

        const orders = await Order.find({user: userId}).populate('orderlineitems');

        return res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully',
            data: orders
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const getAllOrders = async(req, res)=>{
    try {
        const orders = await Order.find().populate('orderlineitems');

        return res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully',
            data: orders
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

// update orders status
const updateOrderStatus = async(req, res)=>{
    try {
        const {orderId, status} = req.body;

    const order = await order.findByIdAndUpdate(orderId, {status}, {new: true});
    if(!order){
        return res.status(404).json({
            status: 'error',
            message: 'Order not found'
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'Order status updated successfully',
        data: order
    });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });    
    }
}


module.exports = {createOrder, getUserOrders, getAllOrders};