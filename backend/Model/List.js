const mongoose = require("mongoose")
const { isEmail } = require('validator');
const { Schema } = mongoose

const employSchema = new Schema({
    f_Id: { type: Schema.Types.UUID },
    f_Image: { type: String, required: true },
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true, unique: true, validate: [isEmail, 'invalid email address'] },
    f_Mobile: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Enter a valid 10-digit number'
        }, required: true
    },
    f_Designation: { type: String, required: true },
    f_gender: { type: String, required: true },
    f_Course: { type: Array, required: true },
    f_Createdate: { type: Date, required: true, default: Date.now }

})


const UserSchema = new Schema({
    f_sno: { type: Schema.Types.UUID },
    f_Email: { type: String, require: true, unique: true, validate: [isEmail, 'invalid email address']  },
    f_userName: { type: String, require: true, unique: true },
    f_Pwd: { type: String, require: true }


})


exports.Employ = mongoose.model('Employ', employSchema)

exports.Users = mongoose.model('Users', UserSchema)
