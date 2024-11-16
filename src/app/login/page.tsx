'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function LoginPage() {
  const router = useRouter()
  const [user ,setUser] = useState({
    email:"",
    password:"",
  })
  const [buttonDisabled ,setButtonDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log("login SUCCESS" ,response.data);
      router.push('/profile')
    } catch (error:any) {
      console.log("login failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 ){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div>
      <h1>{loading ? "Processing":"Signup"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input type="email"
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user ,email:e.target.value})}
      placeholder='email'
       />
      <label htmlFor="password">password</label>
      <input type="password"
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user ,password:e.target.value})}
      placeholder='password'
       />
       <button type='submit' onClick={onLogin}>{buttonDisabled ? "please fill the form" : "login"}</button>
       <Link href='/signup'>Visit signup page</Link>
    </div>
  )
}

