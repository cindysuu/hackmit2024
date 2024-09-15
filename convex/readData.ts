import { query } from "./_generated/server";
import { v } from "convex/values";

export const getStockId = query({
    args: { symbol: v.string() },
    handler: async (ctx, args) => {
        const { symbol } = args;
        const stock = await ctx.db.query("stocks")
        .filter((q) =>
            q.and(q.eq(q.field("symbol"), symbol)),
        )
        .first();
        if (!stock) {
            return { error: `Stock ${symbol} not found` };
        }
        return { stockId: stock._id };
    }
});

export const getStockPrice = query({
    args: { symbol: v.string() },
    handler: async (ctx, args) => {
        const { symbol } = args;
        const stock = await ctx.db.query("stockPrices")
        .filter((q) =>
            q.and(q.eq(q.field("symbol"), symbol)),
        )
        .first();
        if (!stock) {
            return { error: `Stock ${symbol} not found` };
        }
        return { price: stock.price };
    }
});

export const findExistingUserStock = query({
    args: { symbol: v.string(), user: v.string() },
    handler: async (ctx, args) => {
      const { symbol, user } = args;
      const userEntry = await ctx.db.query("stocksOwned")
      .filter((q) =>
          q.and(q.eq(q.field("stockId"), symbol), q.gte(q.field("user"), user)),
        )
      .unique();
      return userEntry;
    },
});