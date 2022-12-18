const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const user = require('../Models/userModel')
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = res.cookies;
    if(!token){
        next(new ErrorHandler("Please Login to access this resource"))
    }
    const decodedData = jwt.verify(token,process.env.JWT_Secret);
    req.user = await user.findById(decodedData.id)
    next()
})