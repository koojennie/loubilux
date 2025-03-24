const express = require("express");
const router = express.Router();
const multer = require('multer');

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countProductByCategory
} = require("../controllers/product.controller");

const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');

const storage = multer.memoryStorage(); // Bisa diganti dengan disk storage jika perlu
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas 5MB per file
}).array("images", 5); // "images" harus sama dengan frontend


router.get("/", getAllProducts);
router.get("/count", countProductByCategory);
router.get("/:id", getProductById);
router.post("/create", authenticateUser, authorizeRoles('admin', 'superadmin'), createProduct);
router.put("/edit/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), updateProduct);
router.delete("/:id", authenticateUser, authorizeRoles('admin', 'superadmin'), deleteProduct);


module.exports = router;
