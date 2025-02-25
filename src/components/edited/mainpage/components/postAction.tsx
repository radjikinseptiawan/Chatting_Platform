import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function PostAction() {
   const [width,setWidth] = useState(window.innerWidth)
    
      useEffect(()=>{
        const resizeOption = ()=> setWidth(window.innerWidth)
    
        window.addEventListener("resize",resizeOption)
        return ()=>{
          window.removeEventListener("resize",resizeOption)
        }
      },[])
    return (
    <>
    <div className="flex justify-center">
    <Card className={`${width < 800 ? "w-80" : "w-96"} fixed z-50 top-0 mx-auto`}>
            <div className="p-2">
            <div className="flex my-1 justify-center">
            <Button className="mx-1">Camera</Button>
            <Button className="mx-1">Picture</Button>
            <Button className="mx-1">Video</Button>
            </div>
            <Input type="text" placeholder="Write something..."></Input>
            <Button className="my-1">Post</Button>
            </div>
    </Card>
    </div>
    </>
  )
}
