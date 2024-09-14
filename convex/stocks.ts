// import { mutation } from "./_generated/server";
// import fetch from "node-fetch";

// export const fetchAndStoreStockData = mutation(async ({ db }, stockSymbol: string) => {
//   const API_KEY = process.env.ALPHA_VANTAGE_API_KEY; // Add your API key here
//   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${API_KEY}`;

//   const response = await fetch(url);
//   const data = await response.json();

//   if (data["Error Message"]) {
//     throw new Error(`Failed to fetch stock data for ${stockSymbol}`);
//   }

//   const timeSeries = data["Time Series (Daily)"];

//   for (const [date, values] of Object.entries(timeSeries)) {
//     const stockData = {
//       symbol: stockSymbol,
//       date,
//       open: parseFloat(values["1. open"]),
//       high: parseFloat(values["2. high"]),
//       low: parseFloat(values["3. low"]),
//       close: parseFloat(values["4. close"]),
//       volume: parseInt(values["5. volume"]),
//     };

//     // Store stock data in the database
//     await db.insert("stocks", stockData);
//   }

//   return `Stock data for ${stockSymbol} added to the database.`;
// });
