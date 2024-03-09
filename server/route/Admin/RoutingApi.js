const express = require('express')
// const AdminUser = express.Router();
const AdminUser = express();
const dotenv = require('dotenv')
dotenv.config();

const multerS3 = require('multer-s3')
let multer = require('multer')
let { S3Client } = require('@aws-sdk/client-s3')

const bucketName = "adminuserss";

// store file in AWS S3 configuration 

const s3 = new S3Client({
    region:  process.env.REGION_ADMIN,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ADMIN,
        secretAccessKey: process.env.SECRETE_KEY_ADMIN
    }
})

//Storage Configuration
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
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


/**
 * @swagger
 *  components:
 *      schemas:
 *          tbl_adminusers:
 *              type : object
 *              properties : 
 *                  uid:
 *                      type: number
 *                  name:
 *                      type: string
 *                  aadhar:
 *                      type: string
 *                  mobile:
 *                      type: string
 *                  photo:
 *                      type: string
 *                  DOB:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password: 
 *                      type: string
 *                  date_of_joining:
 *                      type: string
 *                  qualification:
 *                      type: string
 *                  address:
 *                      type: string
 *                  city:
 *                      type: string
 *                  state:
 *                      type: string
 *                  pincode:
 *                      type: string
 *                  status: 
 *                      type: string 
 * 
 */

/**
 *@swagger
 *  /api/admin/userlist:
 *          get:
 *              summary: This get api is used to check get metod is working or not
 *              description: This api is used to check get metod is working or not
 *              responses:
 *                  200:
 *                      description: to test get method
 *                      content: 
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/tbl_adminusers'
 * 
 
*/

/**
 * 
 * @swagger
 *  /api/admin/registeruser:
 *      post:
 *          summary: This post api is used to check post metod is working or not
 *          descripition: This api is used to check post metod is working or not
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/tbl_adminusers'
 *          responses:
 *              200:
 *                  description: added successfully
 */

/**
 * @swagger
 *  /api/admin/delete/{uid}:
 *     delete:
 *       summary: Delete Employee
 *       description: Delete an employee record by id.
 *       parameters:
 *         - in: path
 *           name: uid
 *           required: true
 *           description: ID of the employee to delete.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Employee deleted successfully.
 */

/**
 * @swagger
 * /api/admin/userupdate/{uid}:
 *   put:
 *     summary: Update an employee's information.
 *     description: Update an employee's information.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the employee to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tbl_adminusers'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tbl_adminusers'
 */


const { getData, getDataById, postData, updateData, updateStatus, deleteData } = require("../../controller/Admin/AdminDatabase")
const Admin_validation = require("../../validation")
AdminUser.get("/api/admin/userlist", getData)
AdminUser.get("/api/admin/viewuser/:uid", getDataById)
AdminUser.post("/api/admin/registeruser",upload.single('photo'), postData,  Admin_validation )
AdminUser.patch("/api/admin/userupdate/:uid", upload.single('photo'), updateData)
AdminUser.patch("/api/admin/updatestatus/", updateStatus)

AdminUser.delete("/api/admin/delete/:uid", deleteData)

module.exports = AdminUser