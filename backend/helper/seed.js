import "dotenv/config";
import connectDB from "../config/db.js";
import User from "../models/user.schema.js";
import Portfolio from "../models/portfolio.schema.js";
import Stock from "../models/stock.schema.js";
import Strategy from "../models/strategy.schema.js";
import Trade from "../models/trade.schema.js";
import { hashPassword } from "../utils/hash.utils.js";
import MarketUpdate from "../models/marketUpdate.schema.js";

// Seed data
const seedData = async () => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Portfolio.deleteMany({});
    await Stock.deleteMany({});
    await Strategy.deleteMany({});
    await Trade.deleteMany({});
    await MarketUpdate.deleteMany({});

    console.log("Existing data cleared!");

    // Create dummy users with hashed passwords
    const users = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: await hashPassword("password123"),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: await hashPassword("password123"),
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: await hashPassword("password123"),
      },
    ];
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded successfully!");

    // Create dummy stocks
    const stocks = [
      {
        symbol: "AAPL",
        companyName: "Apple Inc.",
        price: 150,
        growth: 5,
        sector: "Technology",
        dividendYield: 0.6,
      },
      {
        symbol: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2800,
        growth: 8,
        sector: "Technology",
        dividendYield: 0.3,
      },
      {
        symbol: "AMZN",
        companyName: "Amazon.com Inc.",
        price: 3400,
        growth: 7,
        sector: "E-commerce",
        dividendYield: 0,
      },
      {
        symbol: "TSLA",
        companyName: "Tesla Inc.",
        price: 650,
        growth: 10,
        sector: "Automotive",
        dividendYield: 0,
      },
      {
        symbol: "MSFT",
        companyName: "Microsoft Corp.",
        price: 300,
        growth: 6,
        sector: "Technology",
        dividendYield: 0.9,
      },
      {
        symbol: "NFLX",
        companyName: "Netflix Inc.",
        price: 500,
        growth: 6,
        sector: "Entertainment",
        dividendYield: 0,
      },
      {
        symbol: "META",
        companyName: "Meta Platforms Inc.",
        price: 320,
        growth: 4,
        sector: "Technology",
        dividendYield: 0,
      },
    ];
    const createdStocks = await Stock.insertMany(stocks);
    console.log("Stocks seeded successfully!");

    // Create dummy portfolios with history data
    const portfolios = [
      {
        userMail: createdUsers[0].email,
        growth: 12,
        allocations: {
          stocks: [
            { stock: createdStocks[0]._id, quantity: 10 },
            { stock: createdStocks[1]._id, quantity: 5 },
          ],
          cash: 5000,
        },
        history: [
          {
            date: new Date("2024-01-01"),
            totalValue: 15000,
            growthPercentage: 12,
          },
          {
            date: new Date("2024-02-01"),
            totalValue: 15500,
            growthPercentage: 13.5,
          },
          {
            date: new Date("2024-03-01"),
            totalValue: 16000,
            growthPercentage: 14.5,
          },
        ],
      },
      {
        userMail: createdUsers[1].email,
        growth: 15,
        allocations: {
          stocks: [{ stock: createdStocks[2]._id, quantity: 8 }],
          cash: 10000,
        },
        history: [
          {
            date: new Date("2024-01-01"),
            totalValue: 28000,
            growthPercentage: 15,
          },
          {
            date: new Date("2024-02-01"),
            totalValue: 28500,
            growthPercentage: 16.5,
          },
          {
            date: new Date("2024-03-01"),
            totalValue: 29000,
            growthPercentage: 17.5,
          },
        ],
      },
      {
        userMail: createdUsers[0].email,
        growth: 18,
        allocations: {
          stocks: [
            { stock: createdStocks[3]._id, quantity: 7 },
            { stock: createdStocks[4]._id, quantity: 4 },
          ],
          cash: 3000,
        },
        history: [
          {
            date: new Date("2024-01-01"),
            totalValue: 19500,
            growthPercentage: 18,
          },
          {
            date: new Date("2024-02-01"),
            totalValue: 20000,
            growthPercentage: 19.5,
          },
          {
            date: new Date("2024-03-01"),
            totalValue: 20500,
            growthPercentage: 21,
          },
        ],
      },
      {
        userMail: createdUsers[2].email,
        growth: 10,
        allocations: {
          stocks: [
            { stock: createdStocks[5]._id, quantity: 15 },
            { stock: createdStocks[6]._id, quantity: 10 },
          ],
          cash: 2000,
        },
        history: [
          {
            date: new Date("2024-01-01"),
            totalValue: 28000,
            growthPercentage: 10,
          },
          {
            date: new Date("2024-02-01"),
            totalValue: 28500,
            growthPercentage: 11,
          },
          {
            date: new Date("2024-03-01"),
            totalValue: 29000,
            growthPercentage: 12,
          },
        ],
      },
    ];

    await Portfolio.insertMany(portfolios);
    console.log("Portfolios seeded successfully!");

    // Create dummy strategies
    const strategies = [
      {
        userMail: createdUsers[0].email,
        name: "Growth Investing",
        roi: 10,
        cagr: 8,
        drawdown: 5,
        description: "Investing in high-growth stocks for long-term gains.",
      },
      {
        userMail: createdUsers[1].email,
        name: "Dividend Investing",
        roi: 6,
        cagr: 5,
        drawdown: 3,
        description: "Focus on stocks with regular dividend payouts.",
      },
      {
        userMail: createdUsers[2].email,
        name: "Tech Investing",
        roi: 12,
        cagr: 9,
        drawdown: 4,
        description: "Investing in the technology sector for higher growth.",
      },
    ];
    await Strategy.insertMany(strategies);
    console.log("Strategies seeded successfully!");

    // Create dummy trades with totalCost included
    const trades = [
      {
        userMail: createdUsers[0].email,
        symbol: "AAPL",
        type: "buy",
        quantity: 10,
        price: 150,
        totalCost: 10 * 150,  // Calculating total cost
      },
      {
        userMail: createdUsers[1].email,
        symbol: "AMZN",
        type: "buy",
        quantity: 8,
        price: 3400,
        totalCost: 8 * 3400,  // Calculating total cost
      },
      {
        userMail: createdUsers[2].email,
        symbol: "MSFT",
        type: "sell",
        quantity: 5,
        price: 300,
        totalCost: 5 * 300,  // Calculating total cost
      },
      {
        userMail: createdUsers[0].email,
        symbol: "TSLA",
        type: "buy",
        quantity: 5,
        price: 650,
        totalCost: 5 * 650,  // Calculating total cost
      },
    ];
    await Trade.insertMany(trades);
    console.log("Trades seeded successfully!");

    // Create dummy market updates
    const marketUpdates = [
      {
        symbol: "AAPL",
        price: 152,
        change: 1.2,
        news: "Apple releases new iPhone.",
      },
      {
        symbol: "GOOGL",
        price: 2810,
        change: 0.5,
        news: "Alphabet reports record earnings.",
      },
      {
        symbol: "AMZN",
        price: 3450,
        change: 1.5,
        news: "Amazon unveils new Prime Day deals.",
      },
      {
        symbol: "TSLA",
        price: 660,
        change: 2.5,
        news: "Tesla announces a new electric vehicle model.",
      },
    ];
    await MarketUpdate.insertMany(marketUpdates);
    console.log("Market updates seeded successfully!");

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
};

// Run the script
(async () => {
  await connectDB();
  await seedData();
})();
