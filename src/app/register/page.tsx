'use client'

// import MainPost from "@/components/edited/mainpage"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
const [username,setUsername] = useState<string>("")
const [email,setEmail] = useState<string>("")
const [phone,setPhone] = useState<number | string>()
const [data,setData]= useState<string>("")
const [password,setPassword] = useState<string>("")
const submitInput = async ()=>{
  const newUser = {
    username,
    email,
    phone,
    password
  }

  const response = await axios.post("http://localhost:3000/api/routes",newUser)
  setData(response.data.message)
  setPhone("")
  setUsername("")
  setPassword("")
  setEmail("")
  console.log(data)
}
return(
    <>
    <Card className="w-1/2 mx-auto middle my-32 p-10">
    <CardHeader className="font-bold text-2xl text-center">Register</CardHeader>
    <CardContent>
    <Input value={username} placeholder="username" type="text" onChange={(e)=> setUsername(e.target.value)} className="my-2"/>
    <Input value={email} placeholder="email" type="email" onChange={(e)=> setEmail(e.target.value)} className="my-2"/>
    <Input placeholder="phone" onChange={e => setPhone(e.target.value)} type="number" value={phone} className="my-2"/>
    <Input value={password} placeholder="password" type="password" onChange={(e)=> setPassword(e.target.value)} className="my-2"/>
    <div className="w-full flex justify-center text-center my-1 flex-col">
    <Button onClick={submitInput}>Register</Button>
    <Link href={"/login"} className="my-2">Already have an account?</Link>
    </div>
    </CardContent>
    </Card>
    </>
);
}
