import React, { useState } from "react";
import { Grid } from "@mui/material";
import StrategyCard from "./StrategyCard";
import PropTypes from "prop-types";

const StrategyList = ({ strategies }) => {
  const [strategiesData, setStrategiesData] = useState(strategies);

  const handleUpdate = (updatedStrategy) => {
    const updatedStrategies = strategiesData.map((strategy) =>
      strategy._id === updatedStrategy._id ? updatedStrategy : strategy,
    );
    setStrategiesData(updatedStrategies);
  };

  return (
    <Grid container spacing={4} className="p-4">
      {strategiesData.map((strategy) => (
        <Grid item xs={12} sm={6} md={4} key={strategy._id}>
          <StrategyCard strategy={strategy}  />
        </Grid>
      ))}
    </Grid>
  );
};

export default StrategyList;

StrategyList.propTypes = {
  strategies: PropTypes.array.isRequired,
};