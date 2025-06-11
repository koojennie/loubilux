const { Order, OrderLineItem, Product, User, Address } = require('../models');
const snap = require('../lib/midtransPayments');

const sendRequestPaymentToken = async (req, res) => {
  const { orderId, amount, addressId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  if (!addressId) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // find Order and also wich order line items and Order User
    const order = await Order.findOne({
      where: { orderId },
      attributes: ["orderId", "orderId", "status", "courier", "totalPrice"],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["userId", "userId", "name", "email", "phoneNumber"]
        },
        {
          model: OrderLineItem,
          as: 'orderLineItems',
          attributes: ["orderLineId", "orderId", "quantity"],
          include: {
            model: Product,
            as: "product",
            attributes: ["productId", "name", "price"]
          },
        }
      ],
    });

    const addressOrder = await Address.findOne({
      where: { addressId },
      attributes: [
        "addressId",
        "receiverName",
        "phoneNumber",
        "province",
        "city",
        "postalCode",
        "detail"
      ]
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
      id: item.orderLineId,
      price: item.product.price,
      quantity: item.quantity,
      name: item.product.name,
    }))

    const customer_details = {
      first_name: customer.name,
      email: customer.email,
      phone: customer.phoneNumber,
    }

    // count gross_amount from totalPrice
    const gross_amount = order.totalPrice;

    const addressnya = {
      customer_details,
      address: addressOrder.detail,
      city: addressOrder.city,
    };

    customer_details.billing_address = {
      addressnya
    }

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(gross_amount),
      },
      customer_details: customer_details,
      item_details,
      shipping_address: addressnya,
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      message: "success",
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.error("Midtrans error integration error message: ", err.message)
    return res.status(500).json({ error: 'Error finding the order', message: err.message });
  }
};

const getTranscationDetails = async (req, res) => {
  const { orderId } = req.body;

  const serverKey = process.env.SERVERKEY_MIDTRANS || "";
  const encodedKey = Buffer.from(serverKey + ":").toString("base64");

  try {

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching status', error: err });
  }
}

module.exports = { sendRequestPaymentToken }
