import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createStrategy,
  deleteStrategy,
  getStrategy,
  updateStrategy,
} from "../controllers/strategy.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getStrategy);
router.post("/", authMiddleware, createStrategy);
router.delete("/", authMiddleware, deleteStrategy);
router.put("/", authMiddleware, updateStrategy);

export default router;
