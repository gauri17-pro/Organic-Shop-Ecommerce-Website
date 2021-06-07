const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

exports.getCart = async(req, res) => {
    try {
        const cartId = req.params.cartId;
        let cart = await Cart.findOne({ where: { id: cartId } })
        if (!cart) {
            cart = await Cart.create();
        }
        const products = await cart.getProducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(error.status || 500).send({
            error: error.message || 'Internal Server Error'
        })
    }
}

exports.addToCart = async(req, res) => {
    try {
        const productId = parseInt(req.body.id);
        const cartId = parseInt(req.body.cartId);
        let fetchedCart;
        let newQuantity = 1;
        let cart = await Cart.findOne({ where: { id: cartId } });
        if (!cart) {
            cart = await Cart.create();
        }
        console.log(cart);
        fetchedCart = cart;
        
        const products = await cart.getProducts({ where: { product_id: productId } });
        console.log(products);
        let product;
        if (products.length > 0) {
            product = products[0]
        }
        if(!product){
            product = await Product.findByPk(productId);
        }
        else {
            const oldQuantity = product.CartItem.quantity;
            newQuantity = oldQuantity + 1;
        }

        const result = fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        if (result) {
            res.status(201).send({ cartId: cart.id });
        } else {
            res.status(500).send({ message: "Internal Server error" })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Error while creating cart.'
        })
    }
}

exports.removeFromCart = async (req, res) => {
    try {
        const productId = parseInt(req.body.id);
        const cartId = parseInt(req.body.cartId);

        let cart = await Cart.findOne({ where: { id: cartId } });

        const products = await cart.getProducts({ where: { product_id: productId } });
        let product = products[0];
        console.log(product);
        let result;
        let quantity = product.CartItem.quantity;

        if (quantity == 1) {
            result = product.CartItem.destroy();
        }
        else {
            quantity -= 1;
            result = cart.addProduct(product, { through: { quantity: quantity } })
        }

        if (result) {
            res.status(201).send({ cartId: cartId })
        }
        else {
            res.status(500).send({ message: "Internal Server Error" })
        }

    }
    catch (error) {
        res.status(error.status || 500).send({
            message: error.message || 'Internal Server Error'
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const productId = req.params.productId;
        const cartId = req.params.cartId;
        console.log(cartId, productId)
        let cart = await Cart.findOne({ where: { id: cartId } });
        console.log(cart);
        const products = await cart.getProducts({ where: { product_id: productId } });
        let product = products[0];
        const result = await product.CartItem.destroy();
        if (result) {
            res.send({ message: "Success" })
        }
        else {
            res.status(500).send("Internal server error!")
        }
    }
    catch (error) {
        res.status(error.status || 500).send(error.message || 'Internal Server Error')
    }
}