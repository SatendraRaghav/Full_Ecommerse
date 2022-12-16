const Product = require('../Models/productmodel')

//create product 

exports.createProduct = async(req,res,next)=>{
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).json({
        success:true
    })
    console.log(result)
}
exports.getAllproducts = async (req,res)=>{
    const result = await Product.find({})
    console.log(result)
    res.status(200).json({message:"route is working fine",
result})
}
exports.updateProductById = async (req,res)=>{
    let result = await Product.findById(req.params.id);
    if(!result){
        res.send({
            success:false,
            message:"Product Not Found"
    })
    }
   result =  await Product.findByIdAndUpdate(req.params.id,res.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   });
   res.send({
    success:true,
    result
   })
}
exports.deleteProduct = async(req,res)=>{
    const result = await Product.findOneAndDelete({id:req.params.id})
    res.send({
        success:true,
        message:"Product Deleted succuss"
    })
}