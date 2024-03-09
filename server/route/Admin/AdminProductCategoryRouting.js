const express = require('express')
const AdminProduct = express.Router();








const { getAdminProduct, addAdminProduct, updateAdminProduct, findAdminProductCategory} = require("../../controller/Admin/AdminProductCategory")
AdminProduct.get("/api/admin/category/viewcategory", getAdminProduct)
AdminProduct.post("/api/admin/category/addcategory", addAdminProduct)
AdminProduct.put("/api/admin/category/updatecategory/:Pcategory_id", updateAdminProduct )
AdminProduct.get("/api/admin/category/findcategory/:category_name", findAdminProductCategory)

module.exports = AdminProduct