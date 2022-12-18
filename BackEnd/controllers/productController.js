const Product = require('../Models/productmodel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")

//create product 

exports.createProduct = catchAsyncError(async(req,res,next)=>{
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).json({
        success:true
    })
    console.log(result)
})

// get all products

exports.getAllproducts = catchAsyncError(async(req,res,next)=>{
    const resultPerPage = 10;
    
 const ApiFeatures =  new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const result = await ApiFeatures.query;

    console.log(result)
    res.status(200).json({message:"route is working fine",
result})
})
//update products

exports.updateProductById = catchAsyncError(async (req,res,next)=>{
    // let result = await Product.findById(req.params.id);

   const result =  await Product.findByIdAndUpdate(req.params.id,res.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   });
   if(!result){
    next(new ErrorHandler("Product Not Found",404))}
   res.send({
    success:true,
    result
   })
})
// delete products
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const result = await Product.findOneAndDelete({id:req.params.id})
    if(!result){
        next(new ErrorHandler("Product not found",500))
       
    }
    res.send({
        success:true,
        message:"Product Deleted succuss"   })
})

//get product details
exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const result = await findById(req.params.id);
    if(!result){next(new ErrorHandler("Product not found",500))};
    res.status(200).json({
      success:true,
      result
    })
  })