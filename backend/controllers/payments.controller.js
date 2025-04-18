const Order = require("../models/order.model");
const snap = require("../lib/midtransPayments");

const sendRequestPaymentToken = async (req, res) => {
    const { orderId, amount, customer } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
    }

    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }

    if (!customer) {
        return res.status(400).json({ error: 'Customer is required' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error finding the order', details: err.message });
    }

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: Number(amount),
        },
        customer_details: {
            first_name: customer.name,
            email: customer.email,
            phone: customer.phone,
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        });
    } catch (error) {
        console.error("Midtrans error integration", error.message);
        res.status(500).json({
            message: "Error creating transaction in Midtrans",
            error: error.message
        });
    }
};

module.exports = { sendRequestPaymentToken }
