const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const register = (req, res, next) => {
    const { name, email, password, role } = req.body;
    User.findOne({ where: { email: email } })
        .then(result => {
            if (result) {
                res.send('User is already registered').end();
            } else {
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        User.create({ name: name, email: email, role: role, password: hashedPassword })
                        res.status(201).json({ success: 'success', message: 'User Registered Successfully' })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });
}


const login = (req, res, next) => {
    const {name, password} = req.body;

    User.findOne({ where: { name: name } })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: 'Invalid username or password' })
            } else {
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            const token = jwt.sign({
                                name: user.name,
                                userId: user.id,
                                role: user.role
                            }, process.env.JWT_KEY, {
                                expiresIn: '1h'
                            })
                            res.status(201).json({ success: 'success', result: 'Auth Successful', token: token })
                        } else {
                            res.status(401).json({ result: 'Invalid email or password' })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports = {
    register: register,
    login: login,
}