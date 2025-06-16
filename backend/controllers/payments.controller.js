const { Order, OrderLineItem, Product, User, Address } = require('../models');
const snap = require('../lib/midtransPayments');

const sendRequestPaymentToken = async (req, res) => {
  const { orderId, amount, addressId } = req.body;

  if (!orderId) return res.status(400).json({ error: 'Order ID is required' });
  if (!amount) return res.status(400).json({ error: 'Amount is required' });
  if (!addressId) return res.status(400).json({ error: 'Address ID is required' });

  try {
    const order = await Order.findOne({
      where: { orderId },
      attributes: ['orderId', 'status', 'courier', 'totalPrice'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['userId', 'name', 'email', 'phoneNumber'],
        },
        {
          model: OrderLineItem,
          as: 'orderLineItems',
          attributes: ['orderLineId', 'quantity'],
          include: {
            model: Product,
            as: 'product',
            attributes: ['productId', 'name', 'price'],
          },
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // === 3️⃣ Query Address ===
    const address = await Address.findOne({
      where: { addressId },
      attributes: [
        'addressId',
        'receiverName',
        'phoneNumber',
        'province',
        'city',
        'postalCode',
        'detail',
      ],
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const plainOrder = order.get({ plain: true });
    const plainUser = plainOrder.user;
    const plainItems = plainOrder.orderLineItems;

    const item_details = plainItems.map(item => ({
      id: item.orderLineId,
      price: item.product.price,
      quantity: item.quantity,
      name: item.product.name,
    }));

    const billing_address = {
      first_name: address.receiverName,
      address: address.detail,
      city: address.city,
      postal_code: address.postalCode,
      phone: address.phoneNumber,
      country_code: 'IDN',
    };

    const shipping_address = { ...billing_address };

    const customer_details = {
      first_name: plainUser.name,
      email: plainUser.email,
      phone: plainUser.phoneNumber,
      billing_address,
      shipping_address,
    };

    const parameter = {
      transaction_details: {
        order_id: plainOrder.orderId,
        gross_amount: Number(plainOrder.totalPrice),
      },
      customer_details,
      item_details,
    };

    // === 8️⃣ Buat transaksi Midtrans ===
    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      status: 'success',
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.error('Midtrans integration error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create payment token',
      error: err.message,
    });
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
