const router = require('express').Router()

const cartController = require('../controllers/cartController');

const checkAuth = require('../middleware/is-auth');

router.delete('/:cartId/:productId', cartController.remove);

router.post('/', cartController.addToCart);

router.get('/:cartId', cartController.getCart);

router.put('/', cartController.removeFromCart);



module.exports = router;