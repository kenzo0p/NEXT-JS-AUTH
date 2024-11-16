"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import Link from "next/link";
export const VerifyEmailPage = () => {
  //   const router = useRouter()
  const [token, setToken] = useState("");
  const [verfied, setVerfied] = useState(false);
  const [error, setError] = useState(false);

  const verfyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerfied(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const {query} = router
    // const urlTokenTwo = query.token
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verfyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-4xl">verify Email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verfied && (
        <div>
          <h2>verfied</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>error</h2>
        </div>
      )}
    </div>
  );
};
