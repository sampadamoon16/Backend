const connection = require("../../Model/dbConnect")

const getAdminOffer = (req, res) => {
    try {
        let data = req.body
        sqlQuery = "SELECT offer_id, offer_name, per_discount, flat_discount, upto_discount, valid_from, valid_to, subcategory_id, T_and_C, status FROM tbl_admin_offer";
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error", error)
                res.status(500).send({ error: "Internal Server Error" })
            }
            else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};

const addAdminOffer = (req, res) => {
    try {
        let data = req.body
        let sqlQuery = "INSERT INTO tbl_admin_offer SET ?"
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error", error)
                res.status(500).send({ error: "Internal server Error" })
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};

const updateOffer = (req, res) => {
    try {
        let offer_id = req.params.offer_id
        let data = req.body
        let sqlQuery = "UPDATE tbl_admin_offer SET ? WHERE offer_id = ?";
        connection.query(sqlQuery, [data, offer_id], function (error, result) {
            if (error) {
                console.log("Error", error)
                res.status(500).send({ error: "Internal Server Error" })
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};


const updateOfferStatus = (req, res) => {
    try {
        let status = req.query.status
        let offer_id = req.query.offer_id
        
        let sqlQuery = "UPDATE tbl_admin_offer SET status = ? WHERE offer_id = ?";
        connection.query(sqlQuery, [status, offer_id], function (error, result) {
            if (error) {
                console.log("Error", error)
                res.status(500).send({ error: "Internal Server Error" })
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};


const findOffer = (req, res) => {
    try {
        let per_discount = req.body.per_discount
        let sqlQuery = "SELECT offer_name, valid_from, valid_to, per_discount FROM tbl_admin_offer SET ? WHERE per_discount = ?";
        connection.query(sqlQuery, [per_discount], function (error, result) {
            if (error) {
                console.log("Error", error)
                res.status(500).send({ error: "Internal Server Error" })
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};


module.exports = { getAdminOffer, addAdminOffer, updateOffer, updateOfferStatus, findOffer }