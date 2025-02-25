import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    phone : Number,
    password : String
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User