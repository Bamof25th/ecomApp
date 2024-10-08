import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
// Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";

import NodeCache from "node-cache";
import morgan from "morgan";
import { config } from "dotenv";
import Stripe from "stripe";
import cors from "cors";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURi = process.env.MONGO_URI || "";
const stripekey = process.env.STRIPE_KEY || "";
const app = express();
connectDB(mongoURi);

export const stripe = new Stripe(stripekey);
export const myCache = new NodeCache();

//middleware

app.use(express.json());
app.use(morgan("dev"));

//CORS policy configuration
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// made uploads a static file
app.use("/uploads", express.static("uploads"));

// end middleware for errror handeling
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is running on port http://localhost:${port}`);
});
