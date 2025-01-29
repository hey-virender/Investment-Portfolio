import MarketUpdate from "../models/marketUpdate.schema.js";

export const getMarketUpdates = async (req, res) => {
  try {
    const marketUpdates = await MarketUpdate.find({});
    return res.status(200).json({ data: marketUpdates });
  } catch (error) {
    console.log("getMarketUpdates error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createMarketUpdates = async (req, res) => {
  try {
    const marketUpdates = await MarketUpdate.create(req.body);
    return res.status(201).json({ data: marketUpdates });
  } catch (error) {
    console.log("createMarketUpdates error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



