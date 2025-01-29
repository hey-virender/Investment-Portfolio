import React, { useEffect, useState } from "react";
import PortfolioOverview from "../components/PortfolioOverview";
import { useAxios } from "../api/axiosInstance";

const Home = () => {
  const [portfolio, setPortfolio] = useState(null); 
  const axios = useAxios();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get("/portfolio");

        setPortfolio(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="w-full">
     
      {portfolio ? (
        <PortfolioOverview portfolio={portfolio} />
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
};

export default Home;
