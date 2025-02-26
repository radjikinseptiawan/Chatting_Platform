import { NextResponse } from "next/server"
import { Message } from "../models/models"
import { connectDB } from "../db"

export async function GET(){
    await connectDB()
    const messages = await Message.find()
    return NextResponse.json({msg : messages})
}

export async function POST(req : Request){
    await connectDB()
    try{
        const {textMessage} = await req.json()
        const message = new Message({textMessage})
        await message.save()
        return NextResponse.json({message : "Success asking a request"},{status:200})
    }catch(error){
        return NextResponse.json({message : "Failed to make request!",error},{status:400})
    }
}