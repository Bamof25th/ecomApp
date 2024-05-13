import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
// Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";

const port = 4000;
const app = express();

//middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);


// made uploads a static file
app.use("/uploads", express.static("uploads"));

// end middleware for errror handeling
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Express is running on port http://localhost:${port}`);
  connectDB();
});
