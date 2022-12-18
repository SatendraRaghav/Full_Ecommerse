const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"password should be grater than * character"],
        select:false
    },
    email:{
        type:String,
        required:[true,"Please fill the your email"],
        unique:true,
        validate:[validator.isEmail,"Please fill the valid email"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
//create hash for password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    };
  this.password = await bcrypt.hash(this.password,10)
})
//jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_Secret,{
        expiresIn:process.env.JWT_Expire,
    })
}

//compare password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
module.exports =  mongoose.model("user",userSchema)