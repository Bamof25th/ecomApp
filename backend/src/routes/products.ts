import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// Route - api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// Route - api/v1/product/latest
app.get("/latest", getlatestProducts);

// Route - api/v1/product/all  . with filter
app.get("/all", getAllProducts);

// Route - api/v1/product/categories
app.get("/categories", adminOnly, getAllCategories);

// Route - api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

// Route - api/v1/product/id
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
