const mongoose =require("mongoose");


const users=new mongoose.Schema({
    firstName:{type:String}, 
lastName: {type:String},
age: {type:Number},
country: {type:String},
email:{type:String},
password:{type:String},
})

const articles=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    auther:{type:mongoose.Schema.ObjectId,ref:"User"}
})


const User =mongoose.model("User",users)
const Article=mongoose.model("Article",articles)
