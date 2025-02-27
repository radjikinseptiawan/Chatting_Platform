"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import dotenv from 'dotenv'

dotenv.config()

const getData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

interface itemType {
  _id: number;
  textMessage: string;
}

export default function Home() {

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL
    ||
    "http://localhost:3000/api/chat",
    getData,
    { refreshInterval: 3000 }
  );
  const chatContainerRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("");
  const [isTrue, setIsTrue] = useState(false);

  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[data])

  const postMessage = async () => {
    setIsTrue(true);
    try {
      await axios.post( 
        process.env.NEXT_PUBLIC_API_URL
        ||
        "http://localhost:3000/api/chat", {
        textMessage: message,
      });
    } catch (err) {
      console.error("Error posting message:", err);
    } finally {
      setIsTrue(false);
      setMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-4 rounded-md flex flex-col items-center">
          <Button className="mt-4 flex items-center gap-2" disabled>
            <Loader2 className="w-5 h-5 animate-spin" />
          </Button>
          <p className="text-center text-gray-500">Fetching data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-4 rounded-md flex flex-col items-center">
          <h1 className="font-bold text-lg text-red-600">404</h1>
          <p className="text-center text-red-600">Error fetching data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      
      <div className="bg-white shadow-lg w-full max-w-lg z-20 gap-2 flex items-center rounded-md p-2 fixed top-0">
        <Avatar className="bg-blue-500 rounded-full p-2">
          <AvatarFallback className="font-semibold text-white">DM</AvatarFallback>
        </Avatar>
        <p className="font-semibold">Demo</p>
      </div>

      <div className="w-full max-w-lg min-h-screen mb-16 p-4 my-8 bg-white shadow-lg overflow-y-auto rounded-md">
        <ul className="flex flex-col-reverse space-y-2">
          {data?.msg?.length ? (
            data.msg.map((item: itemType) => (
              <li key={item._id} className="bg-lime-600 my-1 text-white p-3 rounded-xl max-w-fit break-words">
                <p>{item.textMessage}</p>
              </li>
            ))
          ) : (
            <>
            <p className="text-center text-gray-500">Chat akan otomatis terhapus dalam 24 jam (Next Goal)</p>
            <p className="text-center text-gray-500">Tidak ada pesan</p>
            </>
          )}
        </ul>
      </div>

      <div className="bg-white p-4 fixed bottom-0 w-full max-w-lg flex items-center gap-2 px-4">
        <input
          type="text"
          className="flex-1 border rounded-lg p-3 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan..."
        />
        <button
          onClick={postMessage}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600"
          disabled = {isTrue ? true : false}
        >
          {isTrue ? <Loader2 className="w-5 h-5 animate-spin" /> : "Kirim"}
        </button>
      </div>
    </div>
  );
}
