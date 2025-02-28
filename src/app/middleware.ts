/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
    origin : ['https://chatting-platform-two.vercel.app/'],
    methods : ['POST','GET']
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runMiddleware(req : NextApiRequest,res :NextApiResponse, fn : any){
return new Promise((resolve,reject)=>{
    fn(req,res,(result : any)=>{
        if(result instanceof Error){
            return reject(result)
        }
        return resolve(result)
    })
})
}

export default async function handler(req : NextApiRequest,res :NextApiResponse){
    await runMiddleware(req,res,cors)

    if(req.method !== 'POST'){
        return res.status(405).json({message : "Method not allowed"})
    }
    res.status(200).json({message :"Success"})
}