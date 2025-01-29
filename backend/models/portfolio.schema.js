import mongoose from "mongoose";
import Stock from "./stock.schema.js";

const portfolioSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true,
  },
  growth: {
    type: Number,
    required: true,
    default: 0,
  },
  allocations: {
    stocks: [
      {
        stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stock",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    cash: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  // History to track portfolio value and growth over time
  history: [
    {
      date: {
        type: Date,
        required: true,
      },
      totalValue: {
        type: Number,
        required: true,
      },
      growthPercentage: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
