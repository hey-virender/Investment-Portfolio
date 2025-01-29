import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addCash,
  deletePortfolio,
  getPortfolio,
} from "../controllers/portfolio.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getPortfolio);
router.post("/add-cash", authMiddleware, addCash);
router.delete("/", authMiddleware, deletePortfolio);

export default router;
