import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  getUser,
  getAllUsers,
  newUser,
  deleteUser,
} from "../controllers/user.js";

const app = express.Router();

// Route - /api/v1/user/new
app.post("/new", newUser);

// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);

// Route - /api/v1/user/dyanamicId
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;
