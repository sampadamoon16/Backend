const connection = require("../../Model/dbConnect")
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM tbl_adminusers WHERE email = ?";
    connection.query(query, [email], async (err, result) => {
        if (err) {
            res.status(500).json({ data: null, error: err.message });
        } else {
            if (result.length > 0) {
                bcrypt.compare(password.toString(), result[0].password, async (err, response) => {
                    if (err) {
                        console.log("Error in comparing password:", err);
                        return res.status(500).json({ message: "Error in login" });
                    }
                    if (response) {
                        const data = {
                            email: result[0].email,
                            uid: result[0].uid,
                            name: result[0].name,
                        };

                        const option = {
                            expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
                            secure: true,
                            httpOnly: true,
                            sameSite: "none",
                            path: '/',
                        };
                        // ////// this is for Fetch user roles from the database
                        const rolesQuery = "SELECT role_name FROM tbl_admin_role INNER JOIN tbl_admin_role_assign ON tbl_admin_role.role_id = tbl_admin_role_assign.role_id WHERE tbl_admin_role_assign.uid = ?";
                        connection.query(rolesQuery, [result[0].uid], (err, rolesResult) => {
                            if (err) {
                                console.error("Error fetching user roles:", err);
                                return res.status(500).json({ message: "Error in login" });
                            }
                            const roles = rolesResult.map(role => role.role_name);
                            data.roles = roles;
                            const token = jwt.sign(data, "jwt-secret-key", { expiresIn: "1d" });
                            res.status(200).cookie("token", token, option).json({ data: result, roles, token });
                        });
                    } else {
                        res.status(400).json({ message: "Invalid credentials or account deactivated" });
                    }
                });
            } else {
                res.status(400).json({ message: "Invalid credentials or account deactivated" });
            }
        }
    });
};

const verify = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.json("Token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, result) => {
            if (err) {
                return res.json("Wrong token");
            } else {
                req.email = result.email;
                req.uid = result.uid;
                req.name = result.name;
                next();
            }
        });
    }
};

const logout = (req, res) => {
    res.status(200).clearCookie('token', { sameSite: "none", secure: true }).json({ data: null, message: "Logout successful" });
};

module.exports = { login, verify, logout };