const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAveragePrice,
  getSizesByProductId,
  deleteColorByProductId,
} = require("../controllers/productsControllers");

router.get("/", getAllProducts);
router.get("/average", getAveragePrice);
router.get("/size/:id", getSizesByProductId);

router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete("/:id/color/:color", deleteColorByProductId);

module.exports = router;
