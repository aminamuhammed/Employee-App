const mongoose= require('mongoose')
require('dotenv').config()
mongoose
.connect(process.env.mongodb_url)
.then(()=>{
    console.log("connected to the database")
})
.catch((error)=>{
    console.log(error)
})