const express = require('express')
const AdminRole = express.Router();
// const AdminUser = express();






const { getAdminRole, addAdminRole, updateAdminRole } = require("../../controller/Admin/AdminRole")
AdminRole.get("/api/admin/roles/newroles", getAdminRole)
AdminRole.post("/api/admin/roles/newrole", addAdminRole)
AdminRole.patch("/api/admin/roles/updaterole/:role_id", updateAdminRole)

module.exports = AdminRole;