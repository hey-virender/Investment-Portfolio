import React, { useState } from "react";
import { useAxios } from "../api/axiosInstance";
import StrategyList from "../components/StrategyList";
import { useEffect } from "react";

const Strategies = () => {
  const axios = useAxios();
  const [strategies, setStrategies] = useState([]);
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.get("/strategy");
        console.log(response.data.data);
        setStrategies(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStrategies();
  }, []);

  if (strategies.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <StrategyList strategies={strategies} />
    </div>
  );
};

export default Strategies;
