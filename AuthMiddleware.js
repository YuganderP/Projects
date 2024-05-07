const JWT_SECTET = require("../config")

const jwt = require("jsonwebtoken")

const authMiddleware =(req,res,next)=>{
const authHeader = req.headers.authorization

if(!authHeader || authHeader.startsWith("Bearer ")){
    return res.status(400).json("You are not authorized to login ")
}
const token = authHeader.aplit(" ")[1]

try{
    const decoded = jwt.verify(token,JWT_SECTET)
    req.userId = decoded.userId;
    if(decoded.userId){
        next()
    }else{
        return res.status(400).json("You are not authorized to login ")    
    }
} catch(err)
{
    return res.status(400).json("You are not authorized to login ")
}


}

module.exports={
    authMiddleware
}