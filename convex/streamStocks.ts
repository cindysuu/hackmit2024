import { mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

interface TimeSeriesData {
    "4. close": string;
  }
  
  interface AlphaVantageResponse {
    "Time Series (Daily)": {
      [date: string]: TimeSeriesData;
    };
    "Error Message"?: string;
  }

export const streamStocks = action({
    args: {
      symbol: v.string()
    },
    handler: async (ctx, args) => {
      const { symbol } = args;
      const API_KEY = "JJi3jpQFqO4peWflZDIK2nNaVsq1EQE4";
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

      try {
          const response = await fetch(url);
          const data = (await response.json()) as AlphaVantageResponse;
          console.log("hi", data);

          const timeSeries = data["Time Series (Daily)"];
          const latestDate = Object.keys(timeSeries)[0];
          const timestamp = new Date(latestDate);
          const timestampInt = timestamp.getTime();
          console.log(timestampInt);

          const latestData = timeSeries[latestDate];
          const stockPrice = parseFloat(latestData["4. close"]);

          await ctx.runMutation(api.stocks.addPrice, {symbol, price: stockPrice, timestamp: timestampInt});
          return { success: true };
      } catch (error) {
          console.error("Error fetching stock data:", error);
          return { success: false };
      }
    }
});