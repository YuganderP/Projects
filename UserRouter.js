const {Router}= require("express")
const router = Router()
const {User}= require("../DB/index")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const JWT_SECRET= require("../config")
const e = require("express")
router.post("/signup", async (req, res) => {
  const signUpSchema = zod.object({
    firstname: zod.string(),
    username: zod.string(),
    password: zod.string(),
    email: zod.string().email()
  });

  const username = req.body.username;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;

  const { success } = signUpSchema.safeParse({ firstname, username, password, email });

  if (!success) {
    return res.json({ "message": "Email already taken or incorrect inputs" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });
    if (existingUser) {
      return res.json({ "message": "User exist with same username / email" });
    }
    let token = ""
    await  User.create({ username: username, password: password, email: email, firstname: firstname }).then((e)=>{
      token = jwt.sign({
        userId:e._id,

      },JWT_SECRET)
      res.json({ "userId": e._id,"token":token });
    })
    
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Internal Server Error" });
  }
});



router.get("/signin",(req,res)=>{
    res.send("sign in endpoint")
})

router.put("/update",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const firstname= req.body.firstname
    const email = req.body.email
  const userUpdateSchema =  zod.object({
    username:zod.string(),
    firstname:zod.string(),
    email:zod.string()
  })
const {success}= userUpdateSchema.safeParse({username,firstname,email})
if(success){
  User.findOneAndUpdate({username:username},{firstname:firstname,email:email}).then((e)=>{
    res.status(200).send("user details has been updated")
  }).catch((e)=>{
    res.status(400).send("Error updating the user details")
  })

}else{
  res.status(400).send("Error updating the user details")
}

  

  })



router.get("/bulk",async (req,res)=>{
const str = req.query.filter
console.log(str)
 User.find({
  $or:[{
    firstname:{$regex: new RegExp(str,"i")}
  },{
    username:{$regex: new RegExp(str,"i")}
  }]
 }).then((e)=>{
  if(e.length>0){
    res.status(200).json({users:e.map(e=>[{username:e.username,email:e.email,firstname:e.firstname}])})
    }else{
      res.send(null)
    }

  


})



})


router.get("/all",(req,res)=>{
  const users = User.find({})
  
})


module.exports = router