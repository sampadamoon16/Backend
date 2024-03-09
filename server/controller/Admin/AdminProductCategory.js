const connection = require("../../Model/dbConnect");


const getAdminProduct = (req, res) => {
    try {
        let data = req.body
        let sqlQuery = "SELECT Pcategory_id, category_name FROM tbl_admin_product_category";
        connection.query(sqlQuery, data, function (error, result) {
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

const addAdminProduct = (req, res) => {
    try {
        let data = req.body
        let sqlQuery = "INSERT INTO tbl_admin_product_category SET ?"
        connection.query(sqlQuery, data,  function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage);
                return res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: " Server Error" })
    }
};

const updateAdminProduct = (req, res) => {
    try {
        let eid = req.params.Pcategory_id
        let data = req.body
        let sqlQuery = "UPDATE tbl_admin_product_category SET  ? WHERE Pcategory_id = ?"
        connection.query(sqlQuery, [data, eid], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                return res.status(500).json({ error: "Internal Server Error" })
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: " Server Error" })
    }
};


/////      find category name       ////////
const findAdminProductCategory = (req, res) => {
    try {
        let category_name = req.params.category_name; 
        let sqlQuery = "SELECT Pcategory_id, category_name FROM tbl_admin_product_category WHERE category_name = ?";
        connection.query(sqlQuery, [category_name], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage);
                res.status(500).send({ error: "Internal server error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Server Error" });
    }
};


module.exports = { getAdminProduct, addAdminProduct, updateAdminProduct, findAdminProductCategory }