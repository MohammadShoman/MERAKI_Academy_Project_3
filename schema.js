const mongoose =require("mongoose");
const bcrypt = require("bcrypt");

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
    author:{type:mongoose.Schema.ObjectId,ref:"User"},
    comments:[{type:mongoose.Schema.ObjectId,ref:"Comment"}]
})

const comments=new mongoose.Schema({
    comment:{type:String},
    commenter:{type:mongoose.Schema.ObjectId,ref:"User"}
})

users.pre("save",async function(){
    this.email=this.email.toLowerCase();
    this.password=await bcrypt.hash(this.password,10)
   // console.log("aaaa")
})







const User =mongoose.model("User",users)
const Article=mongoose.model("Article",articles)
const Comment=mongoose.model("Comment",comments)

module.exports.User=User;
module.exports.Article=Article;
module.exports.Comment=Comment;
