const mongose = require('mongoose');

const cartSchema = new mongose.Schema(
    {
        user: {
            type: mongose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                product: {
                    type: mongose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);


const Cart = mongose.model('Cart', cartSchema);

module.exports = Cart;