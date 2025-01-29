import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import strategyRoutes from "./routes/strategy.routes.js";
import marketUpdatesRoutes from "./routes/marketUpdate.routes.js";
import stocksRoutes from "./routes/stocks.routes.js";
import tradeRoutes from "./routes/trade.routes.js";
import cors from "cors";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/strategy", strategyRoutes);
app.use("/api/market-updates", marketUpdatesRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/stocks", stocksRoutes);
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
