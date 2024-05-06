const {Router}= require("express")
const router = Router()
const {User}= require("../DB/index")
const zod = require("zod")


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
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.json({ "message": "Username already taken" });
    }

    await User.create({ username: username, password: password, email: email, firstname: firstname });
    res.json({ "message": "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": "Internal Server Error" });
  }
});



router.get("/signin",(req,res)=>{
    res.send("sign in endpoint")
})

router.put("/update:username",(req,res)=>{
    res.send("user details update endpoint ")
})




module.exports = router