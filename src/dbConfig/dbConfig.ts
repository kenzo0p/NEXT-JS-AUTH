import { connect } from 'http2'
import mongoose from 'mongoose'


export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("MongoDB Connected Successfully")
        })
        connection.on('error',(err)=>{
            console.log("MongoDB Connection error Please make sure db is up and running" ,err)
            process.exit()
        })
    } catch (error) {
        console.log(error,"Something went wrong at connecting to db")
    }
}