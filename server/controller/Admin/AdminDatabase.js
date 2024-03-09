const connection = require("../../Model/dbConnect");
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const salt = 10;


const getData = (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_adminusers";
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


const getDataById = (req, res) => {
    try {
        let uid = req.params.uid
        let sqlQuery = "SELECT * FROM tbl_adminusers WHERE uid = ?";
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
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const postData = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_adminusers SET?";

        let data = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            photo: req.file.location,
            aadhar: req.body.aadhar,
            doj: req.body.doj,
            qualification: req.body.qualification,
            dob: req.body.dob,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            status: req.body.status
        }
        bcrypt.hash(data.password, salt, (error, hash) => {
            if (error) {
                res.json(error)
            }
            data = { ...data, password: hash }
            connection.query(sqlQuery, data, function (error, result) {
                if (error) {
                    console.error('Error inserting user: ', error);
                    res.status(500).send('Error inserting user');
                }
                else {
                    console.log("user inserted");
                    res.send("User registered successfully");

                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "sampadamoon4@gmail.com",
                            pass: "afra kbbp ewde mqvi"
                        }
                    })
                    const mailOptions = {
                        from: "sampadamoon4@gmail.com",
                        to: `${data.email}`,
                        subject: "Registration Conform",
                        text: `Thank you for Registrating..!!


Dear ${data.name},
 
I hope this email finds you well.

We wanted to take a moment to express our sincere gratitude for registering with us. Your registration has been successfully processed, and we are pleased to confirm your enrollment.

Your Registration Details:
- Name: ${data.name}
- Email: ${data.email}
- Mobile: ${data.mobile}
- Password: ${data.password}

If you have any questions or require further assistance, please do not hesitate to reach out to our support team at support@example.com or +1 (555) 123-4567. We are here to help you every step of the way.

Thank you once again for choosing Example Company. We look forward to serving you and ensuring your experience with us is exceptional.

Warm regards,

Sampada Moon 
Full Stack Developer
Micro Technology Pvt.Ltd
sampadamoon4@gmail.com
+91 9975090289
Kolar, Bhopal-462001`
                    }
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send('Error sending email');
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).send('Registration successful! Check your email for confirmation.');
                        }
                    })
                }
            })
        })
    } catch (error) {
        console.log("error found...", error.message)
    }
}



const updateData = (req, res) => {
    let uid = req.params.uid
    // let data = req.body
    let data = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        photo: req.file.location,
        aadhar: req.body.aadhar,
        doj: req.body.doj,
        qualification: req.body.qualification,
        dob: req.body.dob,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        pin: req.body.pin,
        status: req.body.status
    }
    let sqlQuery = "UPDATE  tbl_adminusers SET ? WHERE uid = ?"
    connection.query(sqlQuery, [data, uid], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
}
const updateStatus = (req, res) => {
    let uid = req.query.uid
    let status = req.query.status

    let sqlQuery = "UPDATE  tbl_adminusers SET status = ? WHERE uid = ?"
    connection.query(sqlQuery, [status, uid], function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
}

const deleteData = (req, res) => {
    let eid = req.params.uid
    let sqlQuery = "DELETE FROM tbl_adminusers WHERE uid = ?"
    connection.query(sqlQuery, eid, function (err, result) {
        if (err)
            res.send(err)
        else
            res.send(result)
    });
}


module.exports = { getData, getDataById, postData, updateData, updateStatus, deleteData };

