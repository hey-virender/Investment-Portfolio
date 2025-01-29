import express from "express";
import {
  createUser,
  getProfile,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware,logoutUser);
router.put("/update", authMiddleware,updateUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
