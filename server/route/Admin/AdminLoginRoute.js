const express = require('express')
const AdminLogin = express.Router();

const { login, verify, logout } = require('../../controller/Admin/AdminLogin')
AdminLogin.post('/api/admin/login', login)
AdminLogin.post('/api/admin/verify', verify, (req, res) => {
    return res.json({ email: req.email, uid: req.uid })
})
AdminLogin.post('/api/admin/logout', logout)

module.exports = AdminLogin