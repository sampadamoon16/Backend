const express = require('express')
const AdminRoleAssign = express.Router();




const {addAdminRoleAssign, getAdminRoleAssign, updateAdminRoleAssign, deleteAdminRoleAssign} = require("../../controller/Admin/AdminRoleAssign")
AdminRoleAssign.get("/api/admin/roleassign/checkrole/:uid", getAdminRoleAssign)
AdminRoleAssign.post("/api/admin/roleassign/grantrole", addAdminRoleAssign)
AdminRoleAssign.patch("/api/admin/roleassign/changerole/:uid/:role_id", updateAdminRoleAssign)
AdminRoleAssign.delete("/api/admin/roleassign/revokerole/:uid/:role_id", deleteAdminRoleAssign)



module.exports = AdminRoleAssign