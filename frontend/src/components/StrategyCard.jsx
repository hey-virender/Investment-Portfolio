import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { TrendingUp, TrendingDown, AttachMoney } from "@mui/icons-material";
import PropTypes from "prop-types";

const StrategyCard = ({ strategy }) => {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <CardContent>
        <Typography variant="h6" className="text-xl font-bold text-blue-600">
          {strategy.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          {strategy.description}
        </Typography>

        <Grid container spacing={2} className="mt-4">
          <Grid item xs={12} sm={4}>
            <Box className="flex items-center space-x-2">
              <TrendingUp className="text-green-500" />
              <Typography variant="body2" className="text-gray-700">
                ROI: {strategy.roi}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="flex items-center space-x-2">
              <AttachMoney className="text-yellow-500" />
              <Typography variant="body2" className="text-gray-700">
                CAGR: {strategy.cagr}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="flex items-center space-x-2">
              <TrendingDown className="text-red-500" />
              <Typography variant="body2" className="text-gray-700">
                Drawdown: {strategy.drawdown}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StrategyCard;

StrategyCard.propTypes = {
  strategy: PropTypes.object.isRequired,
};
