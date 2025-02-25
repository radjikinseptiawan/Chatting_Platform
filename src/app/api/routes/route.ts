import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../db"
import User from "../models/users";

export async function GET(){
    await connectDB()
    try{
        const users = await User.find();
        return NextResponse.json({message : users})
    }catch{
        return NextResponse.json({error : "Failed to fetching users"},{status : 500})
    }
} 

export async function POST(req : NextRequest){
    await connectDB()
    try{
        const {username,email,phone,password} = await req.json()
        const newUser = new User({username,email,phone,password})
        await newUser.save()

        return NextResponse.json({message : "Data already added!",users : newUser},{status : 200})
    }catch{
        return NextResponse.json({message : "Failed added data!"},{status : 404})
    }
}
