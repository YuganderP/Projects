const express = require("express")
const PORT = 3000
const app  = express()
const cors = require('cors')
const mainRouter = require("./mainRouter")
const userRouter = require("./Routes/UserRouter")
app.use(cors())
app.use(express.json())
// app.use(bodyParser)
app.use("/api/v1/",mainRouter)

app.listen(PORT,()=>{
    console.log("The server has started working ")
})

