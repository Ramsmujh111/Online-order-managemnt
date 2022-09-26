const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

})

exports.User = mongoose.model('User',userSchema);