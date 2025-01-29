import mongoose, { Schema, Types, model } from "mongoose";

// Stock Schema with additional fields
const StockSchema = new Schema({
  symbol: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  price: { type: Number, required: true },
  growth: { type: Number, required: true, default: 0 }, // Annual growth in percentage
  sector: { type: String, required: true }, // Sector like Technology, Healthcare, etc.
  dividendYield: { type: Number, default: 0 }, // Dividend Yield in percentage
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the stock was added
});

const Stock = model("Stock", StockSchema);

export default Stock;
