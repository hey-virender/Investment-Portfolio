import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createTrade, getMyTrades } from "../controllers/trade.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTrade);
router.get("/mine", authMiddleware, getMyTrades);

export default router;
