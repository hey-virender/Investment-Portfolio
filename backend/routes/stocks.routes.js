import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getAllStocks,
  getMyStocks,
  getStockById,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllStocks);
router.get("/me", authMiddleware, getMyStocks);
router.get("/:id", authMiddleware, getStockById);

export default router;
