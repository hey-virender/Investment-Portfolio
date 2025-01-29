import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAxios } from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../store/alertSlice";
import TradeHistory from "../components/TradeHistory";

const StockTrade = () => {
  const dispatch = useDispatch();
  const [stocks, setStocks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState("buy"); // Default trade type
  const axios = useAxios();

  // Fetching the stock data from the backend
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/stocks");
        setStocks(response.data.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    fetchStocks();
  }, []);

  // Handle Buy/Sell actions
  const handleTrade = async () => {
    console.log("selectedStock", selectedStock);
    console.log("tradeType", tradeType), console.log("quantity", quantity);
    try {
      const response = await axios.post("/trade", {
        symbol: selectedStock.symbol,
        type: tradeType,
        quantity,
      });
      dispatch(showAlertWithTimeout("Trade successful", "success"));
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDialog(false); // Close the dialog after trade
    }
  };

  // Handle opening the trade dialog
  const handleTradeDialog = (stock, type) => {
    setSelectedStock(stock);
    setTradeType(type);
    setOpenDialog(true); // Open the dialog for buying/selling
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without making any trade
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {" "}
      <Typography variant="h4" sx={{ textAlign: "left", my: 2 }}>
        Trade Stocks
      </Typography>
      <Box className="flex flex-col md:flex-row">
        <Grid
          container
          className="sm:w-full w-[70%] pt-6 max-h-screen overflow-y-auto"
          spacing={3}
        >
          {stocks.length > 0 &&
            stocks.map((stock) => (
              <Grid item xs={12} key={stock._id}>
                <Box
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    boxShadow: 2,
                    border: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 200, // Fixed height for all stock boxes
                    width: "100%", // Ensures full width
                  }}
                >
                  {/* Stock Name and Information */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1976d2", // Bright color for stock name
                      }}
                    >
                      {stock.companyName} ({stock.symbol})
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#2e7d32" }}>
                      Price: <strong>${stock.price}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#8e24aa" }}>
                      Sector: {stock.sector || "N/A"}
                    </Typography>
                  </Box>

                  {/* Trade Button */}
                  <Box
                    sx={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleTradeDialog(stock, "buy")}
                      sx={{ mb: 1, width: "100%" }}
                    >
                      Buy
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleTradeDialog(stock, "sell")}
                      sx={{ width: "100%" }}
                    >
                      Sell
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Box className="sm:w-full w-[30%]">
          <TradeHistory />
        </Box>

        {/* Dialog for Trade */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
          >
            {tradeType === "buy" ? "Buy Stock" : "Sell Stock"}
          </DialogTitle>
          <DialogContent>
            {selectedStock && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  textAlign: "center",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                {/* Stock Details */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {selectedStock.companyName} ({selectedStock.symbol})
                </Typography>
                <Typography variant="body1" sx={{ color: "#2e7d32" }}>
                  Price per Share: <strong>${selectedStock.price}</strong>
                </Typography>

                {/* Quantity Input */}
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ maxWidth: 300 }}
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                />

                {/* Total Value */}
                <Typography variant="body1" sx={{ color: "#8e24aa" }}>
                  Total Value:{" "}
                  <strong>
                    ${(selectedStock.price * quantity).toFixed(2)}
                  </strong>
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              color="secondary"
              sx={{ width: 100 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTrade}
              variant="contained"
              color={tradeType === "buy" ? "primary" : "error"}
              sx={{ width: 100 }}
            >
              {tradeType === "buy" ? "Buy" : "Sell"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default StockTrade;
