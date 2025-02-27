import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()



export const connectDB = async ()=>{
    try{
        if(mongoose.connection.readyState === 1){
            console.log("Already connected to db")
            return
        }
        await mongoose.connect(process.env.MONGO_URL as string )
    }catch(error){
        console.log("Error conecting to mongoDB",error)
    }
}