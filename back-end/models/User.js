const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    session:{
        type: String,
        default: ""
    },
    image:{
        type: String,
        default: ""
    },
    role:{
        type:String,
        required: true,
        default: "user"
    }
})

module.exports = mongoose.model('User',userSchema)