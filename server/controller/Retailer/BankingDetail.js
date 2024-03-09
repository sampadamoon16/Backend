const connection = require("../../Model/dbConnect")

const addBankDetails = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_banking SET ?"
        let data = {
            reg_no: req.body.reg_no,
            acc_no: req.body.acc_no,
            acc_name: req.body.acc_name,
            ifsc: req.body.ifsc,
            bank_name: req.body.bank_name,
            branch_name: req.body.branch_name,
            upi: req.body.upi,
            // status: req.body.status
        }
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.error("Error:", error.sqlMessage)
                return res.status(500).json({ error: "Internal Server Error" })
            } else {
                res.json(result);
            }
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Server Error" })
    }
}

const getBankDetails = (req, res) => {
    try {
        let id = req.params.reg_no
        let sqlQuery = "SELECT * FROM tbl_retailer_banking where reg_no = ?";
        connection.query(sqlQuery, [id], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getBankDetailsAdmin = (req, res) => {
    try {
        // let id = req.params.reg_no
        let sqlQuery = "SELECT * FROM tbl_retailer_banking";
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

const updateBankDetails = (req, res) => {
    try {
        let reg_no = req.params.reg_no;
        let data = {
            acc_no: req.body.acc_no,
            acc_name: req.body.acc_name,
            ifsc: req.body.ifsc,
            bank_name: req.body.bank_name,
            branch_name: req.body.branch_name,
            upi: req.body.upi,
            // status: req.body.status
        }
        console.log(data)
        let sqlQuery = "UPDATE  tbl_retailer_banking SET ? WHERE reg_no = ?"
        connection.query(sqlQuery, [data, reg_no], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

const updateBankStatus = (req, res) => {
    try {
        let reg_no = req.query.reg_no
        let status = req.query.status

        let sqlQuery = "UPDATE  tbl_retailer_banking SET status = ? WHERE reg_no = ?"
        connection.query(sqlQuery, [status, reg_no], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

const updateUpi = (req, res) => {
    try {
        let reg_no = req.params.reg_no
        let upi = req.body.upi

        let sqlQuery = "UPDATE  tbl_retailer_banking SET upi = ? WHERE reg_no = ?"
        connection.query(sqlQuery, [upi, reg_no], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.send(result)
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

module.exports = { addBankDetails, getBankDetails, getBankDetailsAdmin, updateBankDetails, updateBankStatus, updateUpi }