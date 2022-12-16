const express = require("express");
const { getAllproducts, updateProductById, deleteProduct } = require("../controllers/productController");
const { createProduct } = require( "../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllproducts).delete(deleteProduct)
router.route("/product/new").post(createProduct);
router.route("/products/:id").put(updateProductById)
module.exports = router;