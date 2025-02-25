import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Camera from "../../../../app/asset/camera.svg"
import Film from "../../../../app/asset/film.svg"
import Images from "../../../../app/asset/image.svg"
import Image from "next/image";
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
    <Card className={`${width < 800 ? "w-80" : "w-96"} mx-auto`}>
            <div className="p-2">
            <div className="flex my-1 justify-center">
            </div>
            <Input type="text"  placeholder="Write something..."></Input>
            <div className="flex my-2 justify-end">
            <Button className="mx-1"><Image src={Camera} alt={"camera"}/></Button>
            <Button className="mx-1"><Image src={Film} alt="film"/></Button>
            <Button className="mx-1"><Image src={Images} alt="image"/></Button>
            <Button className="mx-1">Post</Button>
            </div>
            </div>
    </Card>
    </div>
    </>
  )
}
