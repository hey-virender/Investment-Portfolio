import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { useAxios } from "../api/axiosInstance";

const TradeHistory = () => {
  const [trades, setTrades] = React.useState([]);
  const axios = useAxios();

  React.useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get("/trade/mine");
        setTrades(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrades();
  }, []);

  return (
    <Box className="p-3 flex justify-center h-screen">
      <Box className="w-full">
        <Typography variant="h5" className="text-left mb-3 font-bold">
          Trade History
        </Typography>
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            {/* Fixed height container with scrollable content */}
            <Box className="max-h-screen overflow-y-auto">
              <Table className="min-w-full">
                <TableHead>
                  <TableRow className="bg-gray-200">
                    <TableCell className="font-bold">Symbol</TableCell>
                    <TableCell className="font-bold">Type</TableCell>
                    <TableCell className="font-bold">Quantity</TableCell>
                    <TableCell className="font-bold">Price ($)</TableCell>
                    <TableCell className="font-bold">Total Cost ($)</TableCell>
                    <TableCell className="font-bold">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow
                      key={trade._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <TableCell className="flex items-center space-x-3">
                        <Avatar className="bg-blue-500 text-white">
                          {trade.symbol[0]}
                        </Avatar>
                        <span>{trade.symbol}</span>
                      </TableCell>
                      <TableCell className="capitalize flex items-center space-x-2">
                        {trade.type === "buy" ? (
                          <TrendingUp className="text-green-500" />
                        ) : (
                          <TrendingDown className="text-red-500" />
                        )}
                        <span>{trade.type}</span>
                      </TableCell>
                      <TableCell>{trade.quantity}</TableCell>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell>{trade.totalCost}</TableCell>
                      <TableCell>
                        {new Date(trade.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TradeHistory;
