const bcrypt=require('bcrypt')
const { userModel } = require('../model/userModel')
const generateToken = require('../utilities/generateToken')
const {comparePassword, hashedPassword} = require('../utilities/passwordUtilities')


const signup= async (req,res)=>{
    try {
        const { name,phoneNumber,email,password} = req.body

        if(!name || !email || !password || !phoneNumber){
            return res.status(400).json({error:"All fields are Required"})
        }

        const existUser= await userModel.findOne({email})
        
        if(existUser){
            return res.status(400).json({error:"Email already exist"})
        }

        const hashPassword= await hashedPassword(password)

        const newUser = new userModel({ name,email,password:hashPassword,phoneNumber})
        const saved = await newUser.save()

        const token =generateToken(saved._id)
        res.cookie("userToken",token)

        res.status(201).json({message:"Account Created",saved})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message || "internal server error" })
    }
}

const login= async (req,res)=>{
    try {
        const {email,password}=req.body

        if( !email || !password){
            return res.status(400).json({error:"All fields are Required"})
        }

        const existUser=  await userModel.findOne({email})

        if(!existUser){
            return res.status(400).json({error:"user does not exist"})
        }

        const passwordmatch = await comparePassword(password, existUser.password)

        if (!passwordmatch){
            return res.status(400).json({error:"password does not match"})
        }

        const token =generateToken(existUser._id)
        res.cookie("userToken",token)
        delete existUser.password
        
        res.status(200).json({message:"login successfull",existUser,token})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message || "internal server error" })
    }
}


const profile=async(req,res)=>{
    try {
        const userid=req.user;
        const user= await userModel.findById(userid).select("-password")
        if(!user){
            return res.status(404).json("User not found")
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const updateProfile = async (req,res)=>{
    try {
        const id = req.user;

        if(req.body.password){
            const hashed = await hashedPassword(req.body.password)
            req.body.password = hashed
        }

        const updateduser= await userModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updateduser)

    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const logout= async(req,res)=>{
    try {
        await res.clearCookie("userToken")
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

module.exports={
    signup,
    login,
    profile,
    updateProfile,
    logout
    
}