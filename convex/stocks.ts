import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addPrice = mutation({
    args: {
        symbol: v.string(),
        price: v.number(),
        timestamp: v.number(),
      },
    handler: async (ctx, args) => {
        console.log('hi');
        const oldestPrice = await ctx.db.query("stockPrices")
        .withIndex("by_timestamp", q => q.eq("symbol", args.symbol))
        .first();

        console.log(oldestPrice);
  
        if (oldestPrice) {
            await ctx.db.delete(oldestPrice._id);
        }
    
        await ctx.db.insert("stockPrices", {
            symbol: args.symbol,
            price: args.price,
            timestamp: args.timestamp,
        });
    }}); 

    /**
    handler: async (ctx, args) => {
        // Query the oldest price based on the index
        const oldestPrice = await ctx.db.query("stockPrices")
          .withIndex("by_timestamp", q => q.eq("symbol", args.symbol))
          .order("timestamp", "asc")
          .first();  // Get the oldest record
    
        // Delete the oldest price if it exists
        if (oldestPrice) {
          await ctx.db.delete(oldestPrice.id);  // Use `id` instead of `_id`
        }
    
        // Insert the new stock price
        await ctx.db.insert("stockPrices", {
          symbol: args.symbol,
          price: args.price,
          date: args.date,
          timestamp: args.timestamp,
        });
      }
    });
    */
