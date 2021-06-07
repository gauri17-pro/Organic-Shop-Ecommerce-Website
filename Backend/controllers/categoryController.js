const Category = require('../models/category');

exports.getCategories = (req, res) => {
    Category.findAll()
        .then(categories => {
            if (categories.length > 0) {
                res.status(201).json({ Category: categories })
            } else {
                res.status(422).json({ message: "Category list is empty" })
            }
        })
        .catch(err => {
            res.status(503).json({ message: 'Service Unavailable' })
        })
}

