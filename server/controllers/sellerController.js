const { sellerModel } = require("../model/sellerModel")
const generateToken = require("../utilities/generateToken")
const { hashedPassword, comparePassword } = require("../utilities/passwordUtilities")



const signup= async (req,res)=>{
    try {
        const { name,email,password ,phoneNumber} = req.body

        if(!name || !email || !password || !phoneNumber){
            return res.status(400).json({error:"All fields are Required"})
        }

        const existSeller= await sellerModel.findOne({email})
        
        if(existSeller){
            return res.status(400).json({error:"Email already exist"})
        }

        const hashPassword= await hashedPassword(password)

        const newSeller = new sellerModel({ name,email,password:hashPassword,phoneNumber })
        const saved = await newSeller.save()

        const token =generateToken(saved._id)
        res.cookie("sellerToken",token)

        res.status(201).json({message:"Seller Account Created",saved})

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

        const existSeller=  await sellerModel.findOne({email})

        if(!existSeller){
            return res.status(400).json({error:"seller does not exist"})
        }

        const passwordmatch = await comparePassword(password, existSeller.password)

        if (!passwordmatch){
            return res.status(400).json({error:"password does not match"})
        }

        const token =generateToken(existSeller._id,"seller")
        res.cookie("sellerToken",token)

        const sellerObject = existSeller.toObject()
        delete sellerObject.password
        
        res.status(200).json({message:"login successfull",sellerObject,token})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message || "internal server error" })
    }
}


const profile=async(req,res)=>{
    try {
        const sellerid=req.seller;
        const seller= await sellerModel.findById(sellerid).select("-password")
        if(!seller){
            return res.status(404).json("seller not found")
        }
        res.status(200).json(seller)
    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const updateProfile = async (req,res)=>{
    try {
        const id = req.seller;

        if(req.body.password){
            const hashed = await hashedPassword(req.body.password)
            req.body.password = hashed
        }

        const updatedSeller= await sellerModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedSeller)

    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const listAllSellers = async (req,res)=>{
    try {
        const sellerslist = await sellerModel.find()
        res.status(200).json(sellerslist)

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message || "internal server error" })
    }
}

const logout= async(req,res)=>{
    try {
        await res.clearCookie("sellerToken")
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
    logout,
    listAllSellers
    
}

