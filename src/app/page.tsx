"use client"
import axios from "axios"
import { useState } from "react"
import useSWR from "swr"
import dotenv from "dotenv"

dotenv.config()
const getData = async (url: string) => await axios.get(url).then((res) => res.data)

interface itemType {
  _id: number,
  textMessage: string
}

export default function Home() {
  const { data, error, isLoading } = useSWR( process.env.NEXT_PUBLIC_API_URL ||"http://localhost:3000/api/chat", getData, { refreshInterval: 3000 })
  const [message, setMessage] = useState('')

  const postMessage = async () => {
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL ||"http://localhost:3000/api/chat", { textMessage: message })
    setMessage("")
    return response
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }
  if (error) {
    return <p className="text-center text-red-500">Terjadi kesalahan</p>
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg min-h-screen mb-16 p-4 bg-white shadow-lg overflow-y-auto rounded-md">
        <ul className="space-y-2">
          {data?.msg?.length ? data.msg.map((item: itemType) => (
            <li key={item._id} className="bg-lime-600 text-white p-3 rounded-xl max-w-xs break-words">
              <p>{item.textMessage}</p>
            </li>
          )) : <p className="text-center text-gray-500">Tidak ada pesan</p>}
        </ul>
      </div>

      <div className=" bg-white p-4 fixed bottom-0 w-full max-w-lg flex items-center gap-2 px-4">
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
        >
          Kirim
        </button>
      </div>
    </div>
  )
}
