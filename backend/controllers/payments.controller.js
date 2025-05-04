const { Order, OrderLineItem, Product, User } = require('../models');
const snap = require('../lib/midtransPayments');

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
        // find Order and also wich order line items and Order User
        const order = await Order.findOne({
            where: { orderId },
            attributes: ["id", "orderId", "status", "courier", "totalPrice"],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ["id", "userId", "name", "email", "phoneNumber"]
                },
                {
                    model: OrderLineItem,
                    as: 'orderLineItems',
                    attributes: ["id", "orderId", "quantity"],
                    include: {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "price"]
                    },
                }
            ],
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // get customer
        const customer = order.user;

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" })
        }

        // get items from orderLineItems
        const item_details = order.orderLineItems.map(item => ({
            id: item.id.toString(),
            price: item.product.price,
            quantity: item.quantity,
            name: item.product.name,
        }))

        // count gross_amount from totalPrice
        const gross_amount = order.totalPrice;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: Number(gross_amount),
            },
            customer_details: {
                first_name: customer.name,
                email: customer.email,
                phone: customer.phoneNumber,
            }
        };

        const transaction = await snap.createTransaction(parameter);

        return res.status(200).json({
            message: "success",
            token: transaction.token,
            redirect_url: transaction.redirect_url,  
         })
    } catch (err) {
        console.error("Midtrans error integration error message: ", err.message)
        return res.status(500).json({ error: 'Error finding the order', message: err.message });
    }
};

module.exports = { sendRequestPaymentToken }
