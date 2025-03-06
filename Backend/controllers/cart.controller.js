const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const addItemToCart = async (req, res) => {
   try {
    const { user } = req;
    const {productId, quantity} = req.body;

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({message: 'Product not found'});
    }    
    
    let cart = await Cart.findOne({user: user.id});
    if(!cart){
        cart = new Cart({
            user: user.id,
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

        const cart = await Cart.findOne({ user: user.id }).populate('products.product').lean();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
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
        const { user } = req;
        await Cart.findOneAndUpdate(
            { user: user.id },
            { products: [], totalPrice: 0 },
            { new: true }
        );
        
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

        let cart = await Cart.findOne({user: user.id});
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