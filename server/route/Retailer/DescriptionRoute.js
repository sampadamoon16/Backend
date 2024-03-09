const express = require('express')
const Description = express.Router();
const Images = express.Router();

const { getDescription, postDescription, updateDescription, postImage, updateImage, getImage } = require("../../controller/Retailer/ProductDescription")

Description.post("/api/retailer/productdescription/adddescription", postDescription)
Description.get("/api/retailer/productdescription/viewdescription/:pid", getDescription)
Description.patch("/api/retailer/productdescription/updatedescription/:pid", updateDescription) 

Images.post("/api/retailer/productimage/addnew", postImage)
Images.patch("/api/retailer/productimage/update/:image_id", updateImage)
Images.patch("/api/retailer/productimage/viewimage/:pid", getImage)

module.exports = Description 
module.exports= Images