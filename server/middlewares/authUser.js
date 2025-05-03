const jwt = require('jsonwebtoken')

const authUser = (req,res,next)=>{
    try {
        let {userToken} = req.cookies;
        
        if (!userToken){
            return res.status(401).json({error:"Please Signup"})
        }

        const verifiedToken = jwt.verify(userToken,process.env.JWT_SECRET)

        if(!verifiedToken){
            return res.status(401).json({error:"user not authorized"})
        }

        if(verifiedToken.role !== "user"){
            return res.status(401).json({error:"Access denied"})
        }

        req.user = verifiedToken.id

        next()

    } catch (error) {
        return res.status(401).json({error:"user authorization failed"})
    }
}


module.exports = {authUser}