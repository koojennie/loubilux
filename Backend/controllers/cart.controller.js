const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const addItemToCart = async (req, res) => {
   try {
    const { user } = req;
    const {productId, quantity} = req.body;

    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({message: 'Product not found'});
    }
    
    let cart = await Cart.findOne({user: user._id});
    if(!cart){
        cart = new Cart({
            user: user._id,
            products: [],
            totalPrice: 0,
        });
    }

    const productInCart = cart.products.find(product => product.product.toString() === productId);
    if(productInCart){
        productInCart.quantity += quantity;
        productInCart.price += quantity * product.price;
    } else {
        cart.products.push({
            product: productId,
            quantity,
            price: quantity * product.price,
        });
    }

    cart.totalPrice += quantity * product.price;
    await cart.save();
    res.json(cart);

   } catch (error) {
     console.error(error);
     return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error.message
    });
   }
}


const getCart = async (req, res) => {
    try {
        const { user } = req;

        const cart = await Cart.findOne({user: user._id}).populate('products.product');
        res.json(cart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
    
        cart.items = [];
        cart.totalPrice = 0;
    
        await cart.save();
       return res.json({message: 'Cart cleared successfully', data: cart});

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }

}

const removeItemFromCart = async (req, res) => {
    try {
        const { user } = req;
        const { productId } = req.body;

        let cart = await Cart.findOne({user: user._id});
        if(!cart){
            return res.status(404).json({message: 'Cart not found'});
        }

        const productInCart = cart.products.find(product => product.product.toString() === productId);
        if(!productInCart){
            return res.status(404).json({message: 'Product not found in cart'});
        }

        cart.totalPrice -= productInCart.price;
        cart.products = cart.products.filter(product => product.product.toString() !== productId);
        await cart.save();
        res.json(cart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = {
    addItemToCart,
    getCart,
    clearCart,
    removeItemFromCart
}