import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addPrice = mutation({
    args: {
        symbol: v.string(),
        price: v.number(),
        date: v.string(),
        timestamp: v.number(),
      },
    handler: async (ctx, args) => {
    await ctx.db.query("stockPrices")
        .withIndex("by_timestamp", q => q.eq("symbol", args.symbol))
        .first()
        .then(async (oldestPrice) => {
            if (oldestPrice) {
            await ctx.db.delete(oldestPrice._id);
            }
        });
        
        await ctx.db.insert("stockPrices", {
            symbol: args.symbol,
            price: args.price,
            date: args.date,
            timestamp: args.timestamp,
        });
    }}); 
