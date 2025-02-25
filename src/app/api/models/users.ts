import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String,required : true},
    email : {type : String,required : true},
    phone : {type : Number, required : true},
    password : {type : String,required : true},
    otp:{type : String},
    otpExpires : {type : Date}
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User