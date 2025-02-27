import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type : String,required : true},
    email : {type : String,required : true},
    phone : {type : Number, required : true},
    password : {type : String,required : true},
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

const messageSchema = new mongoose.Schema({
    textMessage : {type : String, required : true},
    time : {type : Date, required : true}
})

const Message =  mongoose.models.Message || mongoose.model("Message",messageSchema)

export {User, Message}