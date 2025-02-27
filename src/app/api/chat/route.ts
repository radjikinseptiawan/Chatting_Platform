import { NextResponse } from "next/server"
import { Message } from "../models/models"
import { connectDB } from "../db"

const corsHeaders = {
    "Access-Control-Allow-Origin" : "https://chatting-platform-two.vercel.app/",
    "Access-Control-Allow-Methods" : "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type"
}

export async function GET(){
    await connectDB()
    const messages = await Message.find()
    return NextResponse.json({msg : messages},{headers : corsHeaders})
}

export async function POST(req : Request){
    await connectDB()
    try{
        const {textMessage} = await req.json()

        if(!textMessage){
            return NextResponse.json({message : "Field must be filled!"},{status : 400, headers : corsHeaders})
        }
        const newTime = new Date().toISOString()
        const message = new Message({textMessage,time : newTime})
        await message.save()
        return NextResponse.json({message : "Success asking a request"},{status:200, headers : corsHeaders})
    }catch(error){
        return NextResponse.json({message : "Failed to make request!",error},{status:400, headers : corsHeaders})
    }
}

export function OPTIONS(){
    return NextResponse.json({},{headers : corsHeaders})
}