const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = (req, res, next) => {


    try {
        const authHeader = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(authHeader, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

}