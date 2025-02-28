/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import Alert from '@mui/material/Alert';
import {Check,Dangerous} from '@mui/icons-material/'
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null)
  const submitInput = async () => {
    try{
    setIsLoading(true)
    const response = await axios.post("/api/auth/register",{
      username,email,phone,password
    })
    setUsername("")
    setEmail("")
    setPassword("")
    setPhone("")
    setData(response.data.message || "Registration failed. please try again")
    setStatus(response.data.status || 200)
    setIsLoading(false)  
    }catch(error : any){
      setStatus(error.response?.data?.status || 500)
      setData(error.response?.data?.message)
      setIsLoading(false)
      }
  }

  console.log(status)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      {
      status !== null &&  
      <div className="flex w-1/6  items-center ">
        <motion.div
        initial={{ y: -50, opacity: 0 }}  // Mulai dari atas dengan opacity 0
        animate={{ y: 0, opacity: 1 }}   // Muncul ke posisi normal dengan opacity 1
        exit={{ y: -50, opacity: 0 }}     // Hilang ke atas dengan opacity 0
        transition={{ duration: 0.3 }}    // Durasi animasi
        className="fixed top-6 w-screen"
      >
      <Alert 
      severity={status > 400 ? 'error' : 'success'} 
      icon={status > 400 ? <Dangerous/> :<Check/>}
      className="fixed top-0 w-56"
      >{data}</Alert>
      </motion.div> 
      </div>
      }
      <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white shadow-lg rounded-md">
        <h1 className="font-bold text-4xl my-4">Register</h1>
        <p className="font-semibold text-2xl my-4">Create your account</p>
        <div className="flex flex-col w-full px-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-3 w-full rounded-md mb-4"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-3 w-full rounded-md mb-4"
          />
          <input
            type="string"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="border p-3 w-full rounded-md mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-3 w-full rounded-md mb-4"
          />
        </div>
        {
          isLoading ? 
          
          <Button disabled><LoaderIcon/></Button>
          :

        <Button
          onClick={submitInput}
          className="bg-blue-500 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Register
        </Button>
        }
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
