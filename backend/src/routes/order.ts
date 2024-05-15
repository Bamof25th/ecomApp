import express from "express";
import {
  allOrders,
  deleteOrder,
  getSingleOrders,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/order.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// Route - /api/v1/order/new
app.post("/new", newOrder);

// Route - /api/v1/order/my
app.get("/my", myOrders);

// Route - /api/v1/order/all
app.get("/all", adminOnly, allOrders);

app
  .route("/:id")
  .get(getSingleOrders)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default app;
