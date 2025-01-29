import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import StockCard from "./StockCard";
import { useDispatch, useSelector } from "react-redux";
import MarketUpdates from "./MarketUpdates";
import PropTypes from "prop-types";
import { useAxios } from "../api/axiosInstance";
import { showAlertWithTimeout } from "../store/alertSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  LineElement,
  Tooltip,
  PointElement,
  Legend,
);

const PortfolioOverview = ({ portfolio }) => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const [isAddingCash, setIsAddingCash] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const { name } = useSelector((state) => state.auth.user);
  if (!portfolio) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const { growth, allocations, history } = portfolio;

  const stocks = allocations?.stocks || [];
  const cash = allocations?.cash || 0;

  const stockLabels = stocks.map((item) => item.stock.symbol || "N/A");
  const stockQuantities = stocks.map((item) => item.quantity);

  const pieData = {
    labels: stockLabels,
    datasets: [
      {
        data: stockQuantities,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
      },
    ],
  };

  const lineData = {
    labels: history.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: "Portfolio Growth (%)",
        data: history.map((entry) => entry.growthPercentage),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const handleAddCash = async () => {
    const response = await axios.post("/portfolio/add-cash", { amount });
    if (response.status === 200) {
      setIsAddingCash(false);
      dispatch(showAlertWithTimeout("Cash added successfully", "success"));
    }
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Welcome {name}
        </Typography>
        <Box sx={{ marginBottom: 3 }}>
          <MarketUpdates />
        </Box>
        <Box
          sx={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="primary">
            Total Portfolio Growth: {growth}%
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">Cash Allocation: ${cash}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddingCash(true)}
            >
              Add Cash
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h6">Stock Allocations:</Typography>
            <Grid container spacing={2}>
              {stocks.map((item, index) => (
                <Grid item xs={12} sm={12} key={index}>
                  <StockCard stock={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Stock Allocation Distribution:
            </Typography>
            <Pie style={{ height: "500px", width: "400px" }} data={pieData} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Portfolio Growth Over Time:
            </Typography>
            <Line
              style={{
                height: "500px",
                width: "100%",
                
              }}
              data={lineData}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6">Summary:</Typography>
        <Typography>
          The portfolio currently holds stocks with a cash allocation of ${cash}
          . The total growth of the portfolio is {growth}%.
        </Typography>
      </CardContent>
      <Dialog
        open={isAddingCash}
        keepMounted
        onClose={() => setIsAddingCash(false)}
      >
        <DialogTitle>{"Add Cash"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of cash to add to your portfolio
          </DialogContentText>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingCash(false)}>Cancel</Button>
          <Button onClick={handleAddCash}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PortfolioOverview;

PortfolioOverview.propTypes = {
  portfolio: PropTypes.object.isRequired,
};
