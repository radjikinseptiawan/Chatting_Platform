import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Navigation() {
  return (
    <>
    <div className="bg-slate-100 w-full flex justify-between top-0 p-2 fixed">
          <div className="flex">
            <Input type="text" className="w-56"></Input>
            <Button></Button> 
          </div>
          <div>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          </div>
        </div>
    </>
  )
}
