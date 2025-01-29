import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAxios } from "../api/axiosInstance";

const MarketUpdates = () => {
  const axios = useAxios();
  const [updates, setUpdates] = useState([]);
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get("/market-updates");
        setUpdates(response.data.data);
      } catch (error) {
        console.error("Error fetching market updates:", error);
      }
    };
    fetchUpdates();
  }, []);
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Market Updates
      </Typography>

      <Grid container spacing={2}>
        {updates.map((update) => (
          <Grid item xs={12} sm={6} md={4} key={update._id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="h6" color="textPrimary">
                    {update.symbol}
                  </Typography>
                  <Avatar
                    sx={{
                      backgroundColor:
                        update.change > 0 ? "#4CAF50" : "#F44336",
                    }}
                  >
                    {update.change > 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Avatar>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  Price: ${update.price}
                </Typography>
                <Typography
                  variant="body1"
                  color={update.change > 0 ? "green" : "red"}
                  sx={{ marginBottom: 2 }}
                >
                  Change: {update.change}%
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body2" color="textPrimary">
                  {update.news}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block", marginTop: 1 }}
                >
                  {new Date(update.time).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketUpdates;
