const Product = require('../models/product');
const User = require('../models/user');


exports.addProduct = (req, res) => {
    const { name, price, imageURL, CategoryId} = req.body;
    User.findOne({ where: { id: req.userData.userId } })
        .then(user => {
            user.createProduct({
                    name: name,
                    price: price,
                    imageURL: imageURL,
                    CategoryId: CategoryId
                })
                .then(result => {
                    res.status(201).json({ success: 'success', Product: result })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Fail to add product' })
        })
}

exports.getProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            if (products.length > 0) {
                res.status(201).json({ Product: products })
            } else {
                res.status(422).json({ message: "Product list is empty" })
            }
        })
        .catch(err => {
            res.status(503).json({ message: 'Service Unavailable' })
        })
}

exports.getProduct = (req, res) => {
    Product.findByPk(req.params.Id)
        .then(product => {
            if (!product) {
                res.status(422).json({ message: 'Product is not available in list' })
            } else {
                res.status(201).json({ Product: product })
            }
        })
        .catch(err => {
            res.status(503).json({ message: 'Service Unavailable' })
        })
}

exports.editProduct = (req, res) => {
    const { name, price, imageURL, description } = req.body;
    Product.findByPk(req.params.Id)
        .then(product => {
            product.name = name;
            product.price = price;

            product.imageURL = imageURL;
            product.description = description;
            return product.save();
        })
        .then(product => {
            res.status(200).json({ product: product })
        })
        .catch(err => {
            res.status(503).json({ message: 'Service unavailable' })
        })
}


exports.deleteProduct = (req, res) => {
    Product.findByPk(req.params.Id)
        .then(product => {
            return product.destroy()
        })
        .then(() => {
            res.status(201).json({ message: 'Product is deleted' })
        })
}

