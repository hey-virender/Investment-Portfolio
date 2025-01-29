import Portfolio from "../models/portfolio.schema.js";
import Stock from "../models/stock.schema.js";
import Trade from "../models/trade.schema.js";

export const createTrade = async (req, res) => {
  try {
    const userMail = req.user.email;
    const { type, symbol, quantity } = req.body;
    console.log("createTrade", type, symbol, quantity);

    // Check if user is logged in
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate inputs
    if (!type || !symbol || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (type !== "buy" && type !== "sell") {
      return res.status(400).json({ message: "Invalid trade type" });
    }

    // Convert quantity to number
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum)) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Fetch the stock by symbol
    const stock = await Stock.findOne({ symbol });
    if (!stock) {
      return res.status(400).json({ message: "Stock not found" });
    }
    const stockId = stock._id;
    const price = stock.price;

    // Fetch the user's portfolio
    const portfolio = await Portfolio.findOne({ userMail });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Handle the 'sell' type
    if (type === "sell") {
      const stockIndex = portfolio.allocations.stocks.findIndex(
        (s) => s.stock.toString() === stockId.toString(),
      );

      if (stockIndex === -1) {
        return res
          .status(400)
          .json({ message: "Stock not found in portfolio" });
      }

      const stockEntry = portfolio.allocations.stocks[stockIndex];

      // Check if there are enough stocks to sell
      if (stockEntry.quantity < quantityNum) {
        return res.status(400).json({ message: "Not enough stocks to sell" });
      }

      // Deduct the quantity or remove the stock if quantity hits zero
      stockEntry.quantity -= quantityNum;
      if (stockEntry.quantity === 0) {
        portfolio.allocations.stocks.splice(stockIndex, 1); // Remove stock entry
      }

      // Update the cash
      const soldPrice = quantityNum * price;
      portfolio.allocations.cash =
        (portfolio.allocations.cash || 0) + soldPrice;

      // Save the updated portfolio
      await portfolio.save();

      // Record the trade
      const trade = await Trade.create({
        userMail,
        type,
        stockId,
        quantity: quantityNum,
        soldPrice,
      });

      return res.status(200).json({
        message: "Stock sold successfully",
        updatedPortfolio: trade,
      });
    } else {
      // Handle 'buy' type
      if (!price || quantityNum <= 0) {
        return res.status(400).json({ message: "Invalid price or quantity" });
      }

      const totalCost = price * quantityNum;

      // Check if the user has enough cash to buy the stock
      if (portfolio.allocations.cash < totalCost) {
        return res
          .status(400)
          .json({ message: "Not enough cash to complete the trade" });
      }

      // Deduct the cash from the portfolio
      portfolio.allocations.cash -= totalCost;

      // Check if the stock already exists in the portfolio
      const stockIndex = portfolio.allocations.stocks.findIndex(
        (s) => s.stock.toString() === stockId.toString(),
      );

      if (stockIndex !== -1) {
        // If the stock already exists, update the quantity
        portfolio.allocations.stocks[stockIndex].quantity += quantityNum;
      } else {
        // If the stock doesn't exist, add it to the portfolio
        portfolio.allocations.stocks.push({
          stock: stockId,
          quantity: quantityNum,
        });
      }

      // Save the updated portfolio
      await portfolio.save();

      // Record the trade
      const trade = await Trade.create({
        userMail,
        type,
        symbol,
        price,
        quantity: quantityNum,
        totalCost,
      });

      return res.status(200).json({
        message: "Stock purchased successfully",
        updatedPortfolio: trade,
      });
    }
  } catch (error) {
    console.log("createTrade error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyTrades = async (req, res) => {
  try {
    const userMail = req.user.email;
    const trades = await Trade.find({ userMail });
    if (!trades) {
      return res.status(404).json({ message: "No trades found", data: [] });
    }
    return res.status(200).json({ message: "Trades found", data: trades });
  } catch (error) {
    console.log("getMyTrades error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
