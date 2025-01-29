import Portfolio from "../models/portfolio.schema.js";

export const getPortfolio = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const portfolio = await Portfolio.findOne({ userMail }).populate({
      path: "allocations.stocks.stock",
    });
    if (!portfolio) {
      const newPortfolio = await Portfolio.create({ userMail });
      return res.status(201).json({
        data: newPortfolio,
        message: "Portfolio created successfully",
      });
    }
    return res.status(200).json({ data: portfolio });
  } catch (error) {
    console.log("getPortfolio error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const portfolio = await Portfolio.findOneAndDelete({ userMail });
    if (!portfolio) {
      return res.status(400).json({ message: "Portfolio not found" });
    }
    return res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.log("deletePortfolio error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCash = async (req, res) => {
  try {
    const userMail = req.user.email;
    const { amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }
    const portfolio = await Portfolio.findOne({ userMail });
    if (!portfolio) {
      return res.status(400).json({ message: "Portfolio not found" });
    }
    portfolio.allocations.cash += Number(amount);
    await portfolio.save();
    return res.status(200).json({ message: "Cash added successfully" });
  } catch (error) {
    console.log("addCash error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
