import mongoose from 'mongoose'

const MongoURl = "mongodb+srv://radjikins21:sB6AgU3fqnQ6kCRo@cluster0.bjvov.mongodb.net/"

export const connectDB = async ()=>{
    try{
        if(mongoose.connection.readyState === 1){
            console.log("Already connected to db")
            return
        }
        await mongoose.connect(MongoURl)
    }catch(error){
        console.log("Error conecting to mongoDB",error)
    }
}