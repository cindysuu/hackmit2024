import { action } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";

export const placeStockOrder = action({
  args: {
      symbol: v.string(),
      user: v.string(),
      quantity: v.int64()
  },
  handler: async (ctx, args) => {
    const { symbol, user, quantity } = args;
    const price: { price?: number; error?: string } = await ctx.runQuery(api.readData.getStockPrice, ({ symbol: symbol }));
    if (price.error || !price.price) {
      return { error: `Stock ${symbol} not found` };
    }

    const hasStock = await ctx.runQuery(api.readData.findExistingUserStock, ({ symbol: symbol, user: user }));
    if (hasStock != null) {
      await ctx.runMutation(api.mutations.updateStock, {
        entryId: hasStock._id,
        quantity: hasStock.quantity + quantity,
      });
    } else {
      const response: { stockId?: Id<"stocks">; error?: string } = await ctx.runQuery(api.readData.getStockId, ({ symbol: symbol }));
      if (response.error || !response.stockId) {
        return { error: response.error || `Stock with symbol ${symbol} not found.` };
      }
      await ctx.runMutation(api.mutations.insertStock, {
        stockId: response.stockId,
        user: user,
        quantity: quantity,
        price: price.price,
      });
    }
}}); 