const express = require("express");
const { getAllproducts, updateProductById, deleteProduct, getProductDetails } = require("../controllers/productController");
const { createProduct } = require( "../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllproducts)
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/products/:id").put(updateProductById).delete(deleteProduct).get(getProductDetails)
module.exports = router;