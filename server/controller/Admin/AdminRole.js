const connection = require("../../Model/dbConnect")

const addAdminRole = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_admin_role SET?";
        let data = {
            role_id: req.body.role_id,
            role_name: req.body.role_name,
        }
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.error('Error inserting user: ', error);
                res.status(500).send('Error inserting user');
            }
            else {
                console.log("user inserted");
                res.send("User registered successfully");
            }
        });
    } catch (error) {
        console.log("error found...", error.message)
    }
};


const updateAdminRole = (req, res) => {
    let eid = req.params.role_id
    let data = req.body
    let sqlQuery = "UPDATE tbl_admin_role SET  ? WHERE role_id = ?"
    connection.query(sqlQuery, [data, eid], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
};


const getAdminRole = (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_admin_role";
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
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = { addAdminRole, updateAdminRole, getAdminRole }