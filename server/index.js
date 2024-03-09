const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const salt = 10;

const app = express();

app.use(express.json());
app.use(bodyParser.json())

app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
        credentials: true,
        httpOnly: true
    }
))

// app.use(bodyParser.urlencoded({ extended: true }));

const swaggerui = require('swagger-ui-express')
const swaggerjsdoc = require('swagger-jsdoc')

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NODE JS API DOCUMENTATION",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:5000`
            }
        ]
    },
    apis: ['./route/Admin/RoutingApi.js']
}

//---------------------------------------------------------------------Admin---------------------------------------------------------------
const AdminUser = require("./route/Admin/RoutingApi")
app.use("/", AdminUser)

const AdminRole = require("./route/Admin/adminRoleRoute.js")
app.use("/", AdminRole)

const AdminRoleAssign = require("./route/Admin/AdminRoleAssignRoute.js")
app.use("/", AdminRoleAssign)

const AdminProduct = require("./route/Admin/AdminProductCategoryRouting.js")
app.use("/", AdminProduct)

const AdminSubCategory = require("./route/Admin/AdminSubCategoryRouting.js")
app.use("/", AdminSubCategory)

const AdminOffer = require("./route/Admin/AdminOfferRouting.js")
app.use("/", AdminOffer)

//-------------------------------------------------------------------Retailer-------------------------------------------------------------------
const Registration = require("./route/Retailer/RegistrationRoute")
app.use("/", Registration)

const Products = require("./route/Retailer/ProductsRoute")
app.use("/", Products)
 
const Description = require("./route/Retailer/DescriptionRoute")
app.use("/", Description)

const Images = require("./route/Retailer/DescriptionRoute")
app.use("/", Images)

const LoginRetailer = require('./route/Retailer/LoginRoute')
app.use("/", LoginRetailer)

const AdminLogin = require('./route/Admin/AdminLoginRoute.js')
app.use('/', AdminLogin)

const BankDetails = require('./route/Retailer/BankDetailRoute.js')
app.use('/', BankDetails)
app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerjsdoc(option)))

app.listen(5000, () => {
    console.log("Server is running on port 5000..........!")
})


