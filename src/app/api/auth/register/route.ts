import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../db"
import { User } from "../../models/models";
import bcrypt from "bcrypt"

export async function POST(req : NextRequest){
    await connectDB()
    try{
        const {username,email,phone,password} = await req.json()
        if(!username || !email || !phone || !password){
            return  NextResponse.json({message : "Field must filled!"},{status:400})
        }
        
        const libDbcurrent = await User.findOne({
            $or : [{username : username},{email : email},{phone : phone}]
        })
        if(libDbcurrent){
            return  NextResponse.json({message : "Already used!"},{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            username,
            email,
            phone,
            password : hashedPassword
        })

        return NextResponse.json({message : "Data has been added!",users : newUser},{status : 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message : "Failed added data!"},{status : 404})
    }
}
