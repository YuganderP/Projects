const {Router}= require("express")
const userRouter = require("./Routes/UserRouter")
const router = Router()

router.use("/user/",userRouter)
module.exports = router