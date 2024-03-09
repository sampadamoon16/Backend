const connection = require("../../Model/dbConnect")
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.json("The token is Missing");
    }
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.json("The token was Wrong");
        } else {
            req.email = decoded.email;
            req.reg_no = decoded.reg_no;
            next();
        }
    });
};


const retailerLogin = (req, res) => {
    const { email, password } = req.body;
    const sqlQuery = `SELECT * FROM tbl_retailer_register WHERE email=?`;
    connection.query(sqlQuery, email, (err, result) => {
        if (result) {
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                console.log('Stored Hashed Password:', result[0].password);
                console.log('Is Password Matched?', isMatch);
                if (isMatch) {
                    const token = jwt.sign({ email: result[0].email, reg_no: result[0].reg_no }, "jwt-secret-key", { expiresIn: "1d" })
                    res.cookie('token', token)
                    // return res.status(200).json({ status: "login succesfull" })
                    return res.status(200).json({ result: result, token: token }); // Sending the token response
                } else {
                    return res.status(401).json("Password not match"); // Sending a response for password mismatch
                }
            });
        }
        else {
            return res.json("User not Found")
        }
    });
};


const RetailerLogout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Sucess" });
}

module.exports = { retailerLogin, verifyUser, RetailerLogout };