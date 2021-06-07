const router = require('express').Router();
const userRouter = require('./users');
const productRouter = require('./product');
const categoryRouter = require('./category');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const checkAuth = require('../middleware/is-auth');

router.use('/products', productRouter);

router.use('/users', userRouter);

router.use('/category', categoryRouter);

router.use('/cart', cartRouter);

router.use('/order', orderRouter);

module.exports = router;