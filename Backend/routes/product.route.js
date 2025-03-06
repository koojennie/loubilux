const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');


router.get("/", getAllProducts);
router.post("/create", authenticateUser, authorizeRoles('admin', 'superadmin'), createProduct);
router.get("/:id", getProductById);
router.put("/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), updateProduct);
router.delete("/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), deleteProduct);


module.exports = router;
