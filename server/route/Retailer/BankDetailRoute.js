const express = require('express')
const BankDetails = express.Router();

const { addBankDetails, getBankDetails, getBankDetailsAdmin, updateBankDetails, updateBankStatus, updateUpi } = require("../../controller/Retailer/BankingDetail")

BankDetails.post('/api/retailer/banking/addacc', addBankDetails)
BankDetails.get('/api/retailer/banking/getdetails/:reg_no', getBankDetails)
BankDetails.get('/api/retailer/banking/getdetails', getBankDetailsAdmin)
BankDetails.put('/api/retailer/banking/update-bank-details/:reg_no', updateBankDetails)
BankDetails.patch('/api/retailer/banking/update-bank-status/', updateBankStatus)
BankDetails.patch('/api/retailer/banking/update-bank-upi/:reg_no', updateUpi)



module.exports = BankDetails;