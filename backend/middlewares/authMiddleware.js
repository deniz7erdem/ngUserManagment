
const jwt = require('jsonwebtoken');
const {secureKey} = require('../app.config');

module.exports=(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"oyakRenaultSecureKey16");
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).send({"mesaj":"Yetkiniz yok"})
    }
}