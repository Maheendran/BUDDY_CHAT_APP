import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


export const connetDB=async()=>{
    try{
const connect=await mongoose
.connect("mongodb+srv://datalist:Zb0YtPPW75hcZryg@cluster0.x98fgal.mongodb.net/datalist?retryWrites=true&w=majority",
    {useNewUrlParser:true,useUnifiedTopology:true})
console.log("db conneted")

    }catch(err){
console.log('db error')
process.exit(1)
    }
}