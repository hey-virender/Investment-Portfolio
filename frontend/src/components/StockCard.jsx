import React from "react";
import { Card, CardContent, Typography, Box, Divider, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { Info } from "@mui/icons-material"; // Info icon for additional info hover effect

const StockCard = ({ stock }) => {
  const { companyName, stock: stockDetails, quantity } = stock;
  const worth = (stockDetails.price * quantity).toFixed(2); // Calculating worth

  return (
    <Card
      sx={{
        minWidth: 275,
        marginBottom: 2,
        boxShadow: 5,
        borderRadius: 2,
        padding: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Stock Name and Symbol */}
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "text.primary" }}>
            {companyName} ({stockDetails.symbol})
          </Typography>
          {/* Stock Quantity */}
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              borderRadius: 2,
              paddingX: 2,
              paddingY: 0.5,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, color: "primary.main" }}>
              Quantity: {quantity}
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Stock Details */}
        <Box>
          <Typography variant="body2" color="textSecondary">
            Sector: <b>{stockDetails.sector}</b>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Price: <b>${stockDetails.price}</b>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Growth: <b>{stockDetails.growth}% per year</b>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Dividend Yield: <b>{stockDetails.dividendYield}%</b>
          </Typography>
        </Box>

        {/* Stock Worth */}
        <Box
          sx={{
            marginTop: 2,
            padding: 1.5,
            backgroundColor: "rgba(0, 255, 0, 0.1)",
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="success.main" fontWeight={600}>
            Total Worth: ${worth}
          </Typography>
          {/* Icon for additional info */}
          <IconButton sx={{ color: "text.primary" }}>
            <Info />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StockCard;

StockCard.propTypes = {
  stock: PropTypes.object.isRequired,
};
