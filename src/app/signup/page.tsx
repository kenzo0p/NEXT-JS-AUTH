'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function SignupPage() {
  const router = useRouter()
  const [user ,setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled ,setButtonDisabled] = useState(false)
  const [loading , setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("SIGNUP SUCCESS" ,response.data);
      router.push('login')
    } catch (error:any) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div>
      <h1>{loading ? "Processing":"Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input type="text"
      id='username'
      value={user.username}
      onChange={(e)=>setUser({...user ,username:e.target.value})}
      placeholder='username'
      />
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
       <button type='submit' onClick={onSignup}>{buttonDisabled ? "please fill the form" : "Sign up"}</button>
       <Link href='/login'>Visit login page</Link>
    </div>
  )
}

