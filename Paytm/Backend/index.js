const express = require("express")
const PORT = 3000
const app  = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const mainRouter = require("./mainRouter")
app.use(cors)
app.use(bodyParser)
app.use("/api/v1",mainRouter)
app.listen(PORT,()=>{
    console.log("The server has started working ")
})

