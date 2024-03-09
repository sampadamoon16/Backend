const express = require('express')
const Products = express.Router();

Products.use(express.json())


const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config();
//////AWS S3 configuration/////////

const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRETE_KEY
    }
})

////////Storage Configuration for AWS s3 bucket///////

let storage = multerS3({
    s3: s3,
    bucket: 'subcatee',
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage })

const { getProducts, postProducts, updateProductPrice, updateProductDiscount, updateProductQuantity, getAdminProduct } = require('../../controller/Retailer/Products')

Products.get("/api/retailer/product/productlist/:reg_no", getProducts)
Products.post("/api/retailer/product/addproduct", upload.single('photo'), postProducts)
Products.patch("/api/retailer/product/updateprice/:pid", updateProductPrice)
Products.patch("/api/retailer/product/updatediscount/:pid", updateProductDiscount)
Products.patch("/api/retailer/product/updatequantity/:pid", updateProductQuantity)
Products.get("/api/admin/product/allproducts", getAdminProduct)

module.exports = Products 
