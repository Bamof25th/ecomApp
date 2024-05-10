import express from 'express';
// Importing routes
import userRoute from "./routes/user.js";

const port = 4000;
const app = express();

app.get("/", (req, res) => {
    res.send("Api working with /api/v1");
})

// Using Routes
app.use("/api/v1/user", userRoute)




app.listen(port, () => {
    console.log(`Express is running on port http://localhost:${port}`);
});