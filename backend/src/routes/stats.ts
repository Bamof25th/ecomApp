import express from "express";
import {
  getBarCharts,
  getDashBoardStats,
  getLineCharts,
  getPieCharts,
} from "../controllers/stats.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

// Route - /api/v1/dashboard/stats
app.get("/stats", adminOnly, getDashBoardStats);

// Route - /api/v1/dashboard/pie
app.get("/pie", adminOnly, getPieCharts);

// Route - /api/v1/dashboard/bar
app.get("/bar", adminOnly, getBarCharts);

// Route - /api/v1/dashboard/line
app.get("/line", adminOnly, getLineCharts);

export default app;
