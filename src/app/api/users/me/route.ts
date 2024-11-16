import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDb();

export async function POST(request:NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password")

    
    // check if there is a user




    return NextResponse.json({
        message:"User not find",
        data:user
    })
}