
import { Types, Schema, model } from "mongoose";

const MarketUpdateSchema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number, required: true },
  time: { type: Date, default: Date.now },
  news: { type: String },
});

const MarketUpdate = model("MarketUpdate", MarketUpdateSchema);
export default MarketUpdate;
