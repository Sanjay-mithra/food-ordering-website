const express=require("express")
const { userRouter } = require("./routes/userRoutes")
const cookieParser=require('cookie-parser')
const dbconnection = require("./config/dbConnection")
const { adminRouter } = require("./routes/adminRoutes")
const foodRouter = require("./routes/foodRoutes")
const hotelRouter = require("./routes/hotelRoutes")
const { sellerRouter } = require("./routes/sellerRoutes")
const { cartRouter } = require("./routes/cartRoutes")
require('dotenv').config()
const cors = require ('cors')
const { paymentRouter } = require("./routes/paymentRoutes")
const { orderRouter } = require("./routes/orderRoutes")


const app=express()



//DB connection
dbconnection()

//middlewares
app.use(cors({
    origin: 'https://food-ordering-website-backend.vercel.app',
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())



//routes
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/foods",foodRouter)
app.use("/hotel",hotelRouter)
app.use("/order",orderRouter)
app.use("/seller",sellerRouter)
app.use("/cart",cartRouter)
app.use("/payment",paymentRouter)


app.listen(process.env.port, (err)=> {
    if (err) {
        console.log(err);
        
    } else {
        console.log(`server started on port ${process.env.port} `);
        
    }
})