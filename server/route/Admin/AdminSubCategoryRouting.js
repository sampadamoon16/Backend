const express = require("express")
const AdminSubCategory = express.Router();
const dotenv = require('dotenv')
dotenv.config();


// //store file in AWS S3 configuration 
// const s3 = new S3Client({
//     region:  "ap-south-1",
//     credentials: {
//         accessKeyId: "AKIAR236XVAACH3VQKAG",
//         secretAccessKey: "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"
//     }
// })

// //Storage Configuraion
// let storage = multerS3({
//     s3: s3,
//     bucket:'subcate',
//     acl: 'public-read',
//     metadata: (req, file, cb) => {
//         cb(null, { fieldName: file.fieldname }) 
//     },
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//         cb(null, file.originalname)
//     }

// })
// let upload = multer({ storage: storage })



const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
//---------   AWS S3 configuration  ----------- 
const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRETE_KEY
    }
})

//-------  Storage Configuration for AWS s3 bucket  -----------

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



const { getSubCategory, addSubCategory, updateSubCategory, findSubCategory } = require("../../controller/Admin/AdminSubCategory")
AdminSubCategory.get("/api/admin/subCategory/viewSubcat", getSubCategory)
AdminSubCategory.post("/api/admin/subCategory/addSubcat", upload.single('photo'), addSubCategory)
AdminSubCategory.patch("/api/admin/subCategory/updateSubcat/:subCategory_id", upload.single('photo'), updateSubCategory)
AdminSubCategory.get("/api/admin/subCategory/findsSubcat/:subCategory_name", findSubCategory)

module.exports = AdminSubCategory;