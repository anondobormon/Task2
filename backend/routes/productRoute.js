const {
  createProduct,
  getAllProduct,
  getAProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = require("express").Router();

//create product
router.post(
  "/create",
  isAuthenticatedUser,
  authorizedRole("admin", "editor"),
  createProduct
);

//Get all product
router.get("/products", isAuthenticatedUser, getAllProduct);

//Get a product
router.get("/product/:id", isAuthenticatedUser, getAProduct);

//Update a product
router.put(
  "/product/:id",
  isAuthenticatedUser,
  authorizedRole("admin", "editor"),
  updateProduct
);

//Delete a product
router.delete(
  "/product/:id",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteProduct
);

// router.get("/getall", getAllProject);

module.exports = router;
