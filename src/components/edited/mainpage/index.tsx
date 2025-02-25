import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import Love from '../../../app/asset/heart.svg'
import Image from "next/image";
import PostAction from "./components/postAction";
const users  = [
    {
      "id": 101,
      "username": "johndoe",
      "profile_picture": "https://example.com/profile/johndoe.jpg"
    },
    {
      "id": 104,
      "username": "travel_guru",
      "profile_picture": "https://example.com/profile/travelguru.jpg"
    },
    {
      "id": 106,
      "username": "foodlover",
      "profile_picture": "https://example.com/profile/foodlover.jpg"
    },
    {
      "id": 107,
      "username": "techgeek",
      "profile_picture": "https://example.com/profile/techgeek.jpg"
    },
    {
      "id": 108,
      "username": "fitness_freak",
      "profile_picture": "https://example.com/profile/fitnessfreak.jpg"
    },
    {
      "id": 110,
      "username": "artsy_vibes",
      "profile_picture": "https://example.com/profile/artsyvibes.jpg"
    }
  ]

const posts = [
    {
      "id": 1,
      "user_id": 101,
      "content": "Hari ini sangat menyenangkan! ☀️ #HappyDay",
      "image": "https://example.com/images/post1.jpg",
      "likes": 120,
      "comments": [
        {
          "user_id": 102,
          "text": "Senang mendengarnya! 😊",
          "timestamp": "2025-02-25T10:30:00Z"
        },
        {
          "user_id": 103,
          "text": "Pemandangannya bagus banget! 🔥",
          "timestamp": "2025-02-25T11:00:00Z"
        }
      ],
      "timestamp": "2025-02-25T09:00:00Z"
    },
    {
      "id": 2,
      "user_id": 104,
      "content": "Liburan ke Bali! 🌴🏝️ #Vacation",
      "image": "https://example.com/images/post2.jpg",
      "likes": 250,
      "comments": [
        {
          "user_id": 105,
          "text": "Bali memang luar biasa! 😍",
          "timestamp": "2025-02-25T12:15:00Z"
        }
      ],
      "timestamp": "2025-02-25T10:45:00Z"
    },
    {
      "id": 3,
      "user_id": 106,
      "content": "Makan malam yang lezat! 🍔🍟 #Foodie",
      "image": "https://example.com/images/post3.jpg",
      "likes": 180,
      "comments": [
        {
          "user_id": 107,
          "text": "Itu terlihat enak! 😋",
          "timestamp": "2025-02-25T14:10:00Z"
        }
      ],
      "timestamp": "2025-02-25T13:00:00Z"
    },
    {
      "id": 4,
      "user_id": 108,
      "content": "Latihan pagi ini sangat membakar kalori! 💪🔥 #Fitness",
      "image": "https://example.com/images/post4.jpg",
      "likes": 200,
      "comments": [
        {
          "user_id": 109,
          "text": "Semangat terus! 💯",
          "timestamp": "2025-02-25T15:30:00Z"
        }
      ],
      "timestamp": "2025-02-25T14:45:00Z"
    },
    {
      "id": 5,
      "user_id": 110,
      "content": "Baru saja selesai melukis! 🎨✨ #Art",
      "image": "https://example.com/images/post5.jpg",
      "likes": 95,
      "comments": [
        {
          "user_id": 101,
          "text": "Keren banget hasilnya! 🎭",
          "timestamp": "2025-02-25T16:00:00Z"
        }
      ],
      "timestamp": "2025-02-25T15:50:00Z"
    }
  ]

export default function MainPost() {
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
      <PostAction></PostAction>
      <div className="mt-36">
      {users.map(user => {
     const userPost = posts.filter(post => post.user_id == user.id)
     return(
        <Card key={user.id} className={`${width < 800 ? "w-80":"w-96"} mx-auto my-3`}>
          <CardHeader>
          <div className="flex items-center">
            <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/5705/5705372.png" width={"40px"}></AvatarImage>
            <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold ml-2">{user.username}</h3>
          </div>
          </CardHeader>
          <CardContent>
            {userPost.length > 0 && (
              userPost.map((post)=>(
                <div key={post.id}>
                  <p>{post.content}</p>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            {
              userPost.map(item =>(
                <div key={item.id} className="flex justify-between w-96">
                  <div className="flex hover:cursor-pointer">
                  <Image src={Love} alt="love icon" width={24} height={24}></Image>
                  <p className="mx-2">{item.likes}</p>
                  </div>
                  <div>
                    <p>{item.timestamp.toLocaleLowerCase()}</p>
                  </div>
                </div>
              ))
            }
        </CardFooter>
        </Card>      
      )
    })}
    </div>  
    </>
    );
  }
  