const Joi = require('joi')


const schemaValid = Joi.object({
    uid: Joi.number().min(1).max(50).required(),
    name: Joi.string().min(3).max(50).required(),
    aadhar: Joi.string().min(1).max(12).required(),
    mobile: Joi.string().min(1).max(10).required(),
    photo: Joi.string().required(),
    DOB: Joi.date().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    date_of_joining: Joi.date().required(),
    qualification: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().min(1).max(6).required(),
    status: Joi.string().required(),

});


const Admin_validation = (req, res, next)=>{

const { error, value } = schemaValid.validate(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send("invalid request........",{error:value.error.details[0]} )
    }
    res.send("successfully enter")
}

module.exports = Admin_validation;