const mongoose = require('mongoose');
const validator = require('validator');

//Setting up schema or the fiels that our mongoose collection model will have
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required: true,
        validate(value) { 
            if(!validator.isEmail(value)){
                throw new Error("The email address is not valid");
            }
        }
    },
    password : {
        type: String,
        required : true,
    },
    balance : {
        type : Number,
        required : true,
        default : 0
    }
})
userSchema.pre('save', async function(next) {
    //console.log("called pre");
    next();
})
const User = mongoose.model('users', userSchema);

module.exports = User;