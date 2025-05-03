const jwt = require('jsonwebtoken')

const authSeller = (req,res,next)=>{
    try {
        let {sellerToken} = req.cookies;
        
        if (!sellerToken){
            return res.status(401).json({error:"jwt not found"})
        }

        const verifiedToken = jwt.verify(sellerToken,process.env.JWT_SECRET)

        if(!verifiedToken){
            return res.status(401).json({error:"seller not authorized"})
        }

        console.log(verifiedToken.role);
        
        if(verifiedToken.role !== "seller"){
            return res.status(401).json({error:"Access denied"})
        }

        req.seller = verifiedToken.id

        next()

    } catch (error) {
        return res.status(401).json({error:"seller authorization failed"})
    }
}


module.exports = { authSeller}