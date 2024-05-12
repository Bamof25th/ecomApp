import express from "express";
import { newproduct } from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// Route

app.post("/new", singleUpload, newproduct);

export default app;
