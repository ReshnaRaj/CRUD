const express=require('express')
const app=express()
const userrouter=require('./Routes/userrouter')
const cors=require('cors')
const dbConnection = require('./Connection/database')
const path=require('path')
 
dbConnection()
app.listen(4000,()=>{
    console.log("Server is running on 4000")
})
app.use(cors({
    origin:['http://localhost:3000'],
    method:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use('/',userrouter)