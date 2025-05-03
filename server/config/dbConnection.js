const mongoose=require('mongoose')

const dbconnection=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports= dbconnection;