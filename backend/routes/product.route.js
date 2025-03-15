const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countProductByCategory
} = require("../controllers/product.controller");

const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');


router.get("/", getAllProducts);
router.get("/count", countProductByCategory);
router.get("/:id", getProductById);
router.post("/create", authenticateUser, authorizeRoles('admin', 'superadmin'), createProduct);
router.put("/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), updateProduct);
router.delete("/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), deleteProduct);


module.exports = router;
