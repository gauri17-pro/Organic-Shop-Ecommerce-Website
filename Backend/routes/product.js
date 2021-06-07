const router = require('express').Router()

const productController = require('../controllers/productController');

const checkAuth = require('../middleware/is-auth');

router.get('/', productController.getProducts);

router.get('/:Id', productController.getProduct);

router.post('/addProduct', checkAuth, productController.addProduct);

router.put('/editProduct/:Id', checkAuth, productController.editProduct);

router.delete('/deleteProduct/:Id', checkAuth, productController.deleteProduct);

module.exports = router;

