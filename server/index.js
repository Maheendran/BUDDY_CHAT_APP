import express from 'express'
import bodyParser from 'body-parser'
import { connetDB } from './MongoDB.js'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import cors from 'cors'



const app=express()
// to serve images for public
app.use(express.static('public')); 
app.use('/images', express.static('images'));

// middelware
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

// mongoose connection to mongodb
connetDB()
app.listen(5000,()=>console.log("port connected"))

// useage of route
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)