const connection = require('../../Model/dbConnect')

const getDescription = (req, res) => {
    try {
        let id = req.params.pid
        let sqlQuery = "SELECT * FROM tbl_retailer_product_description WHERE pid = ?";
        connection.query(sqlQuery, [id], function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                return res.status(500).send({ error: "Internal Server Error" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


const postDescription = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_product_description SET ?"
        let data = {
            pid: req.body.pid,
            description: req.body.description,
            size: req.body.size,
            weight: req.body.weight,
            ram: req.body.ram,
            screen: req.body.screen,
            rom: req.body.rom,
            processor: req.body.processor,
            mfd: req.body.mfd,
            expiry_date: req.body.expiry_date,
            material: req.body.material,
            origin_country: req.body.origin_country
        }
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.error("Error:", error.sqlMessage)
                return res.status(500).json({ error: "Internal Server Error" });

            } else {
                res.json(result);
            }
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Server error" })
    }
}

const updateDescription = (req, res) => {
    try {
        let discript = req.body.description
        // let mobile = req.body.mobile
        let id = req.params.pid
        sqlQuery = "UPDATE tbl_retailer_product_description SET description = ?  WHERE pid = ?"
        connection.query(sqlQuery, [discript, id], function (error, result) {
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


// ------------------------------------------------------------------From Image Table ------------------------------------------------------------

const postImage = (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_image SET ?";
        let data = {
            pid: req.body.pid,
            image:req.body.image,
            image_id:req.body.image_id,
            uploadon:req.body.uploadon,
            description: req.body.description,
            color:req.body.color         

        }
        connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.error("Error:", error.sqlMessage)
                return res.status(500).json({ error: "Internal Server Error" });

            } else {
                res.json(result);
            }
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Server error" })
    }
}


const updateImage = (req, res) => {
    try {
        let image = req.body.image        
        let id = req.params.image_id
        sqlQuery = "UPDATE tbl_retailer_image SET image = ?  WHERE image_id = ?";
        connection.query(sqlQuery, [image, id], function (error, result) {
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


const getImage = (req, res) => {
    try {
        let image = req.body.image        
        let id = req.params.image_id
        sqlQuery = "SELECT image FROM tbl_retailer_image WHERE pid = ?";
        connection.query(sqlQuery, [image, id], function (error, result) {
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

module.exports = { getDescription, postDescription , updateDescription, postImage, updateImage, getImage}