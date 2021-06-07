
const router = require('express').Router();

const categoryController = require('../controllers/categoryController');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/is-auth');

router.get('/', categoryController.getCategories);

module.exports = router;