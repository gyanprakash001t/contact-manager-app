const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type :String,
        required : [true, "please add the  user name"],
    },
    email:{
        type : String,
        required :[true, "please add the user email"],
        unique: [true, "Email address is already  taken"]
    },
    password :{
        type: String,
        required :[true, "please enter the  correct password"]
    },
    // timestamps:true,
    
})

module.exports = mongoose.model("user", userSchema);