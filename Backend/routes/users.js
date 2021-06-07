const router = require('express').Router()
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

router.post('/register', bodyParser.json({}), userController.register);
router.post('/login', bodyParser.json({}),userController.login);
router.get('/username', bodyParser.json({}), verifyToken, function(req, res, next){
    return res.status(200).json(decodedToken);
});


var decodedToken = "";
function verifyToken(req, res, next){
    let token = req.query.token;

    jwt.verify(token, 'secret', function(err, tokendata){
        if(err){
            return res.status(404).json({message: 'Unauthorized request'});
        }
        if(tokendata){
            console.log(tokendata);
            decodedToken = tokendata;
            next();
        }
    })
}



module.exports = router;