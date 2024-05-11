import express from 'express';
import { connectDB } from './utils/features.js';
// Importing routes
import userRoute from "./routes/user.js";
import { errorMiddleware } from './middlewares/error.js';


const port = 4000;
const app = express();

//middleware

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api working with /api/v1");
})

// Using Routes
app.use("/api/v1/user", userRoute);


// end middleware for errror handeling
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Express is running on port http://localhost:${port}`);
    connectDB();
});