'use client'

// import MainPost from "@/components/edited/mainpage"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
const [username,setUsername] = useState<string>("")
const [password,setPassword] = useState<string>("")
const submitInput = async ()=>{
  setUsername("")
  setPassword("")
}
return(
    <>
    <Card className="w-1/2 mx-auto middle my-32 p-10">
    <CardHeader className="font-bold text-2xl text-center">Login</CardHeader>
    <CardContent>
    <Input value={username} placeholder="username" type="text" onChange={(e)=> setUsername(e.target.value)} className="my-2"/>
    <Input value={password} placeholder="password" type="password" onChange={(e)=> setPassword(e.target.value)} className="my-2"/>
    <div className="text-center flex flex-col ">
    <Button onClick={submitInput}>Login</Button>
    <Link href={"/register"} className="my-2">Dont have an account?</Link>
    </div>
    </CardContent>
    </Card>
    </>
);
}
