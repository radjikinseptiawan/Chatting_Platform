'use client'

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitInput = async () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white shadow-lg rounded-md">
        <h1 className="font-bold text-4xl my-4">Login</h1>
        <p className="font-semibold text-2xl my-4">Welcome back!</p>
        <div className="flex flex-col w-full px-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
        <button
          onClick={submitInput}
          className="bg-blue-500 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Dont`t have an account ? 
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
