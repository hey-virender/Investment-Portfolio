import Portfolio from "../models/portfolio.schema.js";
import Stock from "../models/stock.schema.js";

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    return res.status(200).json({ data: stocks });
  } catch (error) {
    console.log("getAllStocks error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    return res.status(200).json({ data: stock });
  } catch (error) {
    console.log("getStockById error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyStocks = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const portfolio = await Portfolio.findOne({ userMail }).populate({
      path: "allocations.stocks.stock",
    });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    const stocks = portfolio.allocations.stocks;
    return res.status(200).json({ data: stocks });
  } catch (error) {
    console.log("getMyStocks error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
