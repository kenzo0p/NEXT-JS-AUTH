import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

       const user =  await User.findOne({verfiedToken:token,verifyTokenExpiry:{$gt:Date.now()}})
       if(!user){
        return NextResponse.json({error:"Invalid token details"},{status:500})
       }

       user.isVerified = true
       user.verfiedToken =undefined
       user.verifyTokenExpiry= undefined

       await user.save()

       return NextResponse.json({
        message:"Email verified successfully",
        success:true        
       },{status:500})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}