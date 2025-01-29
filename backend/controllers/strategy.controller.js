import Strategy from "../models/strategy.schema.js";

export const createStrategy = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const { name, roi, cagr, drawdown, description } = req.body;
    console.log("createStrategy", name, roi, cagr, drawdown, description);
    const strategyData = {
      userMail,
      name,
      roi,
      cagr,
      drawdown,
      description,
    };
    const newStrategy = await Strategy.create(strategyData);
    return res
      .status(201)
      .json({ data: newStrategy, message: "Strategy created successfully" });
  } catch (error) {
    console.log("createStrategy error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStrategy = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const strategies = await Strategy.find();
    return res.status(200).json({ data: strategies });
  } catch (error) {
    console.log("getStrategy error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStrategy = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const { name, roi, cagr, drawdown, description } = req.body;
    const strategy = await Strategy.findOne({ userMail });
    if (!strategy) {
      return res.status(400).json({ message: "Strategy not found" });
    }
    if (name) {
      strategy.name = name;
    }
    if (roi) {
      strategy.roi = roi;
    }
    if (cagr) {
      strategy.cagr = cagr;
    }
    if (drawdown) {
      strategy.drawdown = drawdown;
    }
    if (description) {
      strategy.description = description;
    }
    strategy.updatedAt = new Date();
    await strategy.save();
    return res.status(200).json({ data: strategy });
  } catch (error) {
    console.log("updateStrategy error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStrategy = async (req, res) => {
  try {
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(400).json({ message: "User not found" });
    }
    const strategy = await Strategy.findOneAndDelete({ userMail });
    if (!strategy) {
      return res.status(400).json({ message: "Strategy not found" });
    }
    return res.status(200).json({ message: "Strategy deleted successfully" });
  } catch (error) {
    console.log("deleteStrategy error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
