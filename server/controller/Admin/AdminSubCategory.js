const connection = require("../../Model/dbConnect")

const getSubCategory = (req, res) => {
    try {
        let data = req.body
        let sqlQuery = "SELECT c_id, subCategory_id, subCategory_name, photo, addOn FROM tbl_admin_subcategory";
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "Internal Server Error" })
            }
            else {
                res.json(result)
            }
        });

    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: " Server Error" })
    }
};

const addSubCategory = (req, res) => {
    try {
        let data = {
            c_id: req.body.c_id,
            subCategory_id: req.body.subCategory_id,
            subCategory_name: req.body.subCategory_name,
            photo: req.file.location,

        }
        // let { c_id, subCategory_id, subCategory_name } = req.body
        // let photo = req.file.location
        // let { ...data } = { c_id, subCategory_id, subCategory_name, photo }
        // console.log(req.file.location) 
        // let data=req.body
        console.log(data)
        let sqlQuery = "INSERT INTO tbl_admin_subcategory SET ?"
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                // console.log("Error", error)
                // res.status(500).send({ error: "Internal Server Error" })
                res.json(error)

            }
            else {
                res.json(result)
            }
        });

    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};

const updateSubCategory = (req, res) => {
    try {
        let subCategory_id = req.params.subCategory_id
        let data = {
            c_id: req.body.c_id,
            subCategory_name: req.body.subCategory_name,
            photo: req.file.location
        }
        let sqlQuery = "UPDATE tbl_admin_subcategory SET ? WHERE subCategory_id = ?"
        connection.query(sqlQuery, [data, subCategory_id], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "Internal Server Error" })
            }
            else {
                res.json(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }
};


///  find Subcategory  /////
const findSubCategory = (req, res) => {
    try {
        let subCategory_name = req.params.subCategory_name
        let sqlQuery = "SELECT c_id, subCategory_id, addOn FROM tbl_admin_subcategory WHERE subCategory_name = ?";
        connection.query(sqlQuery, [subCategory_name], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "Internal Server Error" })
            }
            else {
                res.json(result)
            }
        });
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Internal Server Error" })
    }
};


module.exports = { getSubCategory, addSubCategory, updateSubCategory, findSubCategory }