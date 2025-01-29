import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { getMarketUpdates } from "../controllers/marketUpdates.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getMarketUpdates);
// router.post("/", authMiddleware, createMarketUpdates);
// router.put("/", authMiddleware, updateMarketUpdates);
// router.delete("/", authMiddleware, deleteMarketUpdates);

export default router;
