const mongoose = require('mongoose');

//User scheme
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);