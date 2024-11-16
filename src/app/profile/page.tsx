'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
    const router  = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
         try {
            const res = await axios.post("/api/users/me")
            console.log(res.data.data._id);
            setData(res.data.data._id)
         } catch (error:any) {
            console.log(error)
         }
    }

    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("LOGOUT SUCCESSFULLY")
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
  return (
    <div>
        <h1>profile page</h1>
        <h2>{data === "nothing" ? "nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button onClick={logout}>logout</button>
        <hr />
        <button onClick={getUserDetails}>get user details</button>
    </div>
  )
}

