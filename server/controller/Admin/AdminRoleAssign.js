const connection = require("../../Model/dbConnect")

const addAdminRoleAssign = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_admin_role_assign SET?";
        let data = {
            uid: req.body.uid,
            role_id: req.body.role_id,
            assignedon: req.body.assignedon,
        }

        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.error('Error inserting user: ', error);
                res.status(500).send('Error inserting user');
            }
            else {
                console.log("user inserted");
                res.send("Role assign to User successfully");
            }
        })

    } catch (error) {
        console.log("error found...", error.message)
    }
}

const getAdminRoleAssign = (req, res) => {
    try {
        let uid = req.params.uid
        let sqlQuery = `SELECT role_name FROM tbl_admin_role WHERE role_id IN(select role_id from tbl_admin_role_assign WHERE uid = ${uid})`;
        connection.query(sqlQuery, uid, function (error, result) {
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

const updateAdminRoleAssign = (req, res) => {
    let uid = req.params.uid
    let role_id = req.params.role_id
    // let data = req.body
    const { role_name, columnValue } = req.body;
    let sqlQuery = `UPDATE tbl_admin_role_assign SET  uid = ? AND role_id = ? WHERE uid`
    connection.query(sqlQuery, [columnValue, uid, role_id], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
}


const deleteAdminRoleAssign = (req, res) => {
    let uid = req.params.uid
    let role_id = req.params.role_id
   
    let sqlQuery = `DELETE FROM tbl_admin_role_assign WHERE uid = ? AND role_id = ? `
    connection.query(sqlQuery, [ uid, role_id], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
}


module.exports = { addAdminRoleAssign, getAdminRoleAssign, updateAdminRoleAssign, deleteAdminRoleAssign }