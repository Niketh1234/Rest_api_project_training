const express = require("express");
const {
  GetProducts,
  GetProduct,
  AddProducts,
  DeleteProduct,
  UpdateProduct,
} = require("../controller");
const router = express.Router();

router.get("/products", GetProducts);
router.get("/products/:id", GetProduct);
router.post("/products", AddProducts);
router.delete("/products/:id", DeleteProduct);
router.patch("/products/:id", UpdateProduct);
module.exports = router;
