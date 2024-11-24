const mongoose=require('mongoose')
mongoose
const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    role: { type: String, default: 'user', enum: ['admin', 'user'] }
})

const UserModel = mongoose.model('userData', userSchema)
module.exports=UserModel