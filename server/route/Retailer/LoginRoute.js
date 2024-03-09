const express = require('express');
const LoginRetailer = express.Router();
const { retailerLogin, verifyUser, RetailerLogout } = require('../../controller/Retailer/RetailerLogin');
const cookieParser = require('cookie-parser')
LoginRetailer.use(cookieParser())


LoginRetailer.post('/api/retailer/retailerLogin', retailerLogin)
LoginRetailer.post('/api/retailer/userverify', verifyUser,  (req, res) => {
    return res.json({ email: req.email, reg_no: req.reg_no })
})

LoginRetailer.get('/api/retailer/retailerlogout', RetailerLogout)

module.exports = LoginRetailer 