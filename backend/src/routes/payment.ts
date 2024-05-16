import express from "express";
import {
  allCoupons,
  applyDiscount,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.js";

const app = express.Router();

// Route - /api/v1/payment/discount
app.get("/discount", applyDiscount);

// Route - /api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);

// Route - /api/v1/payment/coupon/all
app.get("/coupon/all", allCoupons);

// Route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id", deleteCoupon);

export default app;
