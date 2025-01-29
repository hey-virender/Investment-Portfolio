import { Schema, Types,model } from "mongoose";

const strategySchema = new Schema({
  userMail:{type:String,required: true },
  name: { type: String, required: true },
  roi: { type: Number, required: true },
  cagr: { type: Number, required: true },
  drawdown: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Strategy = model("Strategy", strategySchema);

export default Strategy;
