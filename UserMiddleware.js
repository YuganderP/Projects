const zod = require('zod')
const { User } = require('../DB')




const signUpValidation = (req,res,next)=>{
    const username = req.body.username
    const firstname = req.body.firstname
    const email= req.body.email
    const password = req.body.password
const {success}=  signUpSchema.safeParse({firstname,username,password,email})
if(!success){
    res.json({"message":"Email alreay taken or incorrect inputs"})
}
const user=(User.findOne({username:username}))
if(user._id){
res.json({"message":"Email alreay taken or incorrect inputs"})
}
next()

}

module.exports = signUpValidation