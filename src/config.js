const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const UserSchema = new Schema({
    username:{
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
    },
    dob:{
        type: Date,
        required: true
    },
    mobilenumber:{
        type: Number,
        required: true
    }
});


// Create a model based on that schema
const User = mongoose.model("users", UserSchema);


// export the model
module.exports = User;