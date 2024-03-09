const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password :"root1@",
    database:"project"
})

connection.connect((error) => {
    if (error)
        console.log("database not connected")
    else
        console.log("database connected........!")
})

module.exports = connection;