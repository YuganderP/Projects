const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:Admin%402024@cluster0.ptpacby.mongodb.net/Paytm").then(()=>{
    console.log("db has connected")
})
// Creating a user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    username:String,
    password:String,
    email:String
})

// Creating a model 


const User = new mongoose.model("Users",userSchema)

module.exports={User}
