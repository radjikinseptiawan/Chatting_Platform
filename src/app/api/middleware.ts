import { NextResponse } from "next/server"

export function middleware(){
 const res = NextResponse.next()
  res.headers.set("Access-Control-Allow-Origin","*") 
  res.headers.set("Access-Control-Allow-Methods","GET,POST,OPTIONS")
  res.headers.set("Access-Control-Allow-Headers","Content-Type")
  return res 
}