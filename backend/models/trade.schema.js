import { Schema, Types,model } from "mongoose";

const TradeSchema = new Schema({
  userMail:{type:String,require:true},
  symbol: { type: String, required: true }, // Stock symbol
  type: { type: String, enum: ["buy", "sell"], required: true }, // Buy or Sell
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Price per unit
  date: { type: Date, default: Date.now }, // Trade timestamp
  totalCost:{type:Number,required:true},
});

const Trade = model("Trade", TradeSchema);

export default Trade;