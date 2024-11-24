const mongoose=require("mongoose")
const empSchema=new mongoose.Schema({
    name: String,
    email: String,
    designation: String,
    location: String,
    salary: Number
});

const empModel = mongoose.model('empData', empSchema)
module.exports=empModel