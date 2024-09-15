import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const updateStock = mutation({
    args: { entryId: v.id("stocksOwned"), quantity: v.int64() },
    handler: async (ctx, args) => {
      const { entryId, quantity } = args;
      ctx.db.patch(entryId, { quantity: quantity });
    }
  });
  
export const insertStock = mutation({
    args: { stockId: v.id("stocks"), user: v.string(), quantity: v.int64(), price: v.number() },
    handler: async (ctx, args) => {
        const { stockId, user, quantity } = args;
        await ctx.db.insert("stocksOwned", { stockId: stockId, user: user, quantity: quantity });
    }
});