const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true,
        min:3
    },
    profilePic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
    },
    role:{
        type:String,
        enum:["admin","user","seller"],
        default:"seller"
    }

},{timestamps:true})

const sellerModel= new mongoose.model("sellers",sellerSchema)

module.exports={
    sellerModel
}