
const router = require('express').Router();

const orderController = require('../controllers/orderController');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/is-auth');

router.get('/', checkAuth, orderController.getOrder);

router.post('/', checkAuth, orderController.addOrder);

router.get('/:id', checkAuth, orderController.getOrderById);

module.exports = router;