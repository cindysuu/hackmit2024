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
      console.log('Reached');
      const { symbol } = args;
      const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

      try {
        console.log(args.symbol);
          const response = await fetch(url);
          const data = (await response.json()) as AlphaVantageResponse;

          if (data["Error Message"]) {
              throw new Error(`Failed to fetch ${symbol}`);
          }

          const timeSeries = data["Time Series (Daily)"];
          const latestDate = Object.keys(timeSeries)[0];
          const timestamp = new Date(latestDate)
          const timestampInt = timestamp.getTime();

          const latestData = timeSeries[latestDate];
          const stockPrice = parseFloat(latestData["4. close"]);
          console.log(stockPrice);

          ctx.runMutation(api.stocks.addPrice, {symbol, price: stockPrice, date: latestDate, timestamp: timestampInt});

          return { success: true };
      } catch (error) {
          console.error("Error fetching stock data:", error);
          return { success: false };
      }
    }
});