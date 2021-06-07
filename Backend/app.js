const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const compression = require('compression')

const sequelize = require('./util/dbconfig');
const api_routes = require('./routes/api_routes');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Category = require('./models/category');
const Shipping = require('./models/shipping');


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(compression());
app.use(cors());


app.use(process.env.API_BASE_URL, api_routes)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
Product.belongsTo(Category, {constraints: true});
Order.hasMany(Shipping);
Shipping.belongsTo(Order);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);


var port = process.env.PORT || 8090;

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port);
        console.log('API is running at ' + port)
    })
    .catch(err=>{
        console.log(err);
    })
    