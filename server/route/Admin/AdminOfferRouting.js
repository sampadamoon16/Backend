const express = require('express')
const AdminOffer = express.Router();

const { getAdminOffer, addAdminOffer, updateOffer, updateOfferStatus, findOffer } = require("../../controller/Admin/AdminOffer.js")
AdminOffer.get("/api/admin/offer/viewoffer", getAdminOffer)
AdminOffer.post("/api/admin/offer/createoffer", addAdminOffer )
AdminOffer.put("/api/admin/offer/updateoffer/:offer_id", updateOffer)
AdminOffer.patch("/api/admin/offer/updatestatus/", updateOfferStatus)

module.exports = AdminOffer