const connection = require("../../Model/dbConnect")
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
salt = 10;
saltt = 10;

const getRegisterData = (req, res) => {
    try {
        let id = req.params.reg_no
        let sqlQuery = "SELECT * FROM tbl_retailer_register where reg_no = ?";
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

const postRegisterData = (req, res) => {
    // console.log(req.body.reg_no, "kkkk")
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_register SET ?"
        console.log("reqbody", req.body)
        let data = {
            reg_no: req.body.reg_no,
            gst_no: req.body.gst_no,
            tin_no: req.body.tin_no,
            shop_pan: req.body.shop_pan,
            shop_name: req.body.shop_name,
            contact_no: req.body.contact_no,
            mobile: req.body.mobile,
            website: req.body.website,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            doc_pan: req.files[0].location,
            doc_shop: req.files[1].location,
            t_and_c: req.body.t_and_c,
            // status: req.body.status,
            // regOn: req.body.regOn,
            password: req.body.password
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


Dear Sir/Madam,

I hope this email finds you well.

We wanted to take a moment to express our sincere gratitude for registering with us. Your registration has been successfully processed, and we are pleased to confirm your enrollment.

Your Registration Details:
- Shop Name: ${data.shop_name}
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
kolar, Bhopal`
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
        console.log("Error:", error);
        res.status(500).json({ error: "Server error" })
    }
}


const updateRegisterData = (req, res) => {
    try {
        let id = req.params.reg_no

        let data = {
            reg_no: req.body.reg_no,
            gst_no: req.body.gst_no,
            tin_no: req.body.tin_no,
            shop_pan: req.body.shop_pan,
            shop_name: req.body.shop_name,
            contact_no: req.body.contact_no,
            mobile: req.body.mobile,
            website: req.body.website,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            doc_pan: req.body.doc_pan,
            doc_shop: req.body.doc_shop,
            t_and_c: req.body.t_and_c,
            status: req.body.status,
            regOn: req.body.regOn,
            password: req.body.password
        }
        let sqlQuery = "UPDATE tbl_retailer_register SET ? WHERE reg_no = ?"
        connection.query(sqlQuery, [data, id], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "internal server Error" })
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server Error" })
    }

}

const updateRegStatus = (req, res) => {
    try {
        let status = req.query.status
        let reg_no = req.query.reg_no

        sqlQuery = "UPDATE tbl_retailer_register SET status = ?  WHERE reg_no = ?"
        connection.query(sqlQuery, [status, reg_no], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "internal server error" })
            } else {
                res.json(result)
            }
        })

    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "server error" })
    }
}

// const updateRegPassword = (req, res) => {
//     try {
//         let data = {
//             plainPassword: req.body.password,
//             id: req.params.reg_no,
//         }
//         bcrypt.hash(data.plainPassword, salt, (hashError, hashedPassword) => {
//             if (hashError) {
//                 console.log("Error hashing password:", hashError);
//                 res.status(500).send({ error: "Error hashing password" });
//             } else {
//                 sqlQuery = "UPDATE tbl_retailer_register SET password = ? WHERE reg_no = ?";
//                 data = { ...data, plainPassword: hash }
//                 connection.query(sqlQuery, [hashedPassword, data.id], function (error, result) {
//                     if (error) {
//                         console.log("Error:", error.sqlMessage);
//                         res.status(500).send({ error: "Internal server error" });
//                     } else {
//                         res.json(result);
//                     }
//                 });
//             }
//         });
//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).send({ error: "Server error" });
//     }
// };


const updateRegPassword = (req, res) => {
    try {
        const saltRounds = 10; 
        const { reg_no } = req.params;
        const { password } = req.body;

        bcrypt.genSalt(saltRounds, (saltError, salt) => {
            if (saltError) {
                console.log("Error generating salt:", saltError);
                res.status(500).send({ error: "Error generating salt" });
            } else {
                bcrypt.hash(password, salt, (hashError, hashedPassword) => {
                    if (hashError) {
                        console.log("Error hashing password:", hashError);
                        res.status(500).send({ error: "Error hashing password" });
                    } else {
                        const sqlQuery = "UPDATE tbl_retailer_register SET password = ? WHERE reg_no = ?";
                        connection.query(sqlQuery, [hashedPassword, reg_no], (error, result) => {
                            if (error) {
                                console.log("Error:", error.sqlMessage);
                                res.status(500).send({ error: "Internal server error" });
                            } else {
                                res.json(result);
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Server error" });
    }
};

// const updateRegPassword = (req, res) => {
//     const { id } = req.params;
//     const { currentPassword, newPassword } = req.body;

//     let users =[
//         {
//             // id: 1,
//             // username: 'example_user',
//             // password: '$2b$10$3dqYb5Bq7aU6/3.xnJ.W7u6P/GPAsDD6.L5gAtWCGS71zmwyFmIvO', // Sample hashed password
//             plainPassword : req.body.password,
//              id : req.params.reg_no,
//         }]
//         

//     const user = users.find((user) => user.id === parseInt(id));

//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     // Compare the entered current password with the stored hashed password
//     bcrypt.compare(currentPassword, user.plainPassword, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error comparing passwords' });
//         }
//         if (!result) {
//             return res.status(401).json({ error: 'Current password is incorrect' });
//         }

//         // Hash the new password
//         bcrypt.hash(newPassword, saltRounds, (hashErr, hashedPassword) => {
//             if (hashErr) {
//                 return res.status(500).json({ error: 'Error hashing password' });
//             }

//             // Update user's password in the database (or in memory in this case)
//             user.plainPassword = hashedPassword;

//             // Send a success message
//             return res.json({ message: 'Password updated successfully' });
//         });
//     });
// };

const updateRegDoc = (req, res) => {
    try {
        let documents = req.body.doc_shop
        // let pan = req.body.doc_pan
        let id = req.params.reg_no
        sqlQuery = "UPDATE tbl_retailer_register SET doc_shop = ?  WHERE reg_no = ?"
        connection.query(sqlQuery, [documents, id], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "Internal server error" })
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Server error" })

    }
}

const getAdminShop = (req, res) => {
    try {

        let sqlQuery = "SELECT reg_no, shop_name , mobile, website, email, status FROM tbl_retailer_register";
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).send({ error: "Server error" })
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).send({ error: "Internal server error" })
    }
}

module.exports = { getRegisterData, postRegisterData, updateRegisterData, updateRegStatus, updateRegPassword, updateRegDoc, getAdminShop }
