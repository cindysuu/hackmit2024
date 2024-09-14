import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import dotenv from 'dotenv';
dotenv.config();

// const stream = await useMutation(api.streamStocks.streamStocks);

setInterval(async () => {
    try {
      const url = process.env.EXPO_PUBLIC_CONVEX_URL;
      if (!url) {
        throw new Error("Convex URL is not defined");
      }
      const convex = new ConvexHttpClient(url);
      const response = await convex.action(api.streamStocks.streamStocks, {
        symbol: "AAPL",
      });

      if (response.ok) {
        console.log("Stock data updated successfully");
      } else {
        console.error(`Failed to update data: status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating stock data:", error);
    }
  }, 3000);
  // 86400000 = 1 day