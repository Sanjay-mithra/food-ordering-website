
const { adminModel } = require("../model/adminModel")
const generateToken = require("../utilities/generateToken")
const { hashedPassword, comparePassword } = require("../utilities/passwordUtilities")

const { foodModel } = require("../model/foodModel");
const { userModel } = require("../model/userModel");
const { orderModel } = require("../model/orderModel");
const { restaurantModel } = require("../model/restaurantModel");


const login = async (req,res)=>{
    try {
        const {email,password}=req.body

        if( !email || !password){
            return res.status(400).json({error:"All fields are Required"})
        }

        const existAdmin=  await adminModel.findOne({email})

        if(!existAdmin){
            return res.status(400).json({error:"Admin does not exist"})
        }

        const passwordmatch = await comparePassword(password, existAdmin.password)

        if (!passwordmatch){
            return res.status(400).json({error:"password does not match"})
        }

        const token = generateToken(existAdmin);
        
        res.cookie("adminToken",token)

        const AdminObject = existAdmin.toObject()
        delete AdminObject.password
        
        res.status(200).json({message:"Welcome Admin",AdminObject,token})

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message || "internal server error" })
    }
}

const updateProfile = async (req,res)=>{
    try {
        const id = req.admin;

        if(req.body.password){
            const hashed = await hashedPassword(req.body.password)
            req.body.password = hashed
        }

        const updatedAdmin= await adminModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedAdmin)

    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const logout= async(req,res)=>{
    try {
        await res.clearCookie("adminToken")
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const getDashboardStats = async (req, res) => {
    try {
      const foodCount = await foodModel.countDocuments();
      const restaurantCount = await restaurantModel.countDocuments();
      const userCount = await userModel.countDocuments();
      const orderCount = await orderModel.countDocuments();
  
      res.status(200).json({
        foods: foodCount,
        restaurants: restaurantCount,
        users: userCount,
        orders: orderCount,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
      res.status(500).json({ error: "Error fetching dashboard stats" });
    }
  };

  const listAllUsers = async (req, res) => {
    try {
      if (!req.admin) {
        console.log('req.admin is undefined');
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (req.admin.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  
      const users = await userModel.find().select('-password');
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };
  

  const getAdminProfile = async (req, res) => {
    const tokenPayload = req.admin;
  
    if (!tokenPayload) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      // Use adminModel here
      const admin = await adminModel.findById(tokenPayload.id).select('-password');
  
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
  
      console.log(admin.name, admin.email); // ✅ Should now log correctly
  
      res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
    
  module.exports = {
    login,
    logout,
    updateProfile,
    getDashboardStats,
    listAllUsers,
    getAdminProfile
  };