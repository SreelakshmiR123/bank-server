// create model

//import mongoose
const mongoose=require('mongoose')

//define schema-feilds and values of collection
const usersSchema=new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
    
})

//model-collection name
const users=new mongoose.model("users",usersSchema)

//export model
module.exports=users