const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../Models/userModel");
const async = require('hbs/lib/async');
const { findOne } = require('../Models/userModel');
const sendToken = require('../utils/jwtToken');

//Register a user
exports.registerUser = catchAsyncError(async(req,res)=>{
    const {name,email,password} = req.body;
    const user = new User({name,email,password,avatar:{public_id:"hj",url:"bbb"}})
    await user.save();
    sendToken(user,201,res)
})

// login user
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password-"))
    };
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password--"))
    };
    sendToken(user,200,res)
})

//logout user
exports.logoutUser = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"logged out"
    })
})