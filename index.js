//import .env file
require('dotenv').config()

//1.import express
const express = require("express")
const router=require('./routes/router')
const cors = require('cors')


//2.creating server using express
const Server = express()

Server.use(cors())

//to convert all incomin json data to js data
Server.use(express.json())

//router-set
Server.use(router)

//import connection.js file
require('./db/connection')
 
//3.server run

//port
const port = 5000 || process.env.port

Server.listen(port, () => {
    console.log(`_______server started at port number ${port} _______`);

})

//api calls resolve - post
// Server.post('/register',(req,res)=>{
//     res.send("post method working...")
// })

// Server.post('/login',(req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);
//     res.send("login worked")
// })
// Server.get('/getexc',(req,res)=>{
//     res.send("get worked")
// })