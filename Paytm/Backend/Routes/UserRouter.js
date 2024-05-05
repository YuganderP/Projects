const {Router}= require("express")
const router = Router()
const {User}= require("../DB/index")

router.post("/signup",async (req,res)=>{

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

await User.create({username:username,email:email,password:password,firstname:firstname}).then((e)=>{

res.status(200).send("User has been created")
})

})


router.get("/signin",(req,res)=>{
    res.send("sign in endpoint")
})

router.put("/update:username",(req,res)=>{
    res.send("user details update endpoint ")
})




module.exports = router