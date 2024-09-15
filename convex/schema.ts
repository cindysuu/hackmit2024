import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stocks: defineTable({
    symbol: v.string(),
    name: v.string()
  }),
  stockPrices: defineTable({
    symbol: v.string(),
    price: v.number(),
    timestamp: v.number(), //store as number of ms to convert to Date object
  }).index("by_timestamp", ["symbol", "timestamp"]),
  stocksOwned: defineTable({
    stockId: v.id("stocks"),
    quantity: v.int64(),
    user: v.string()
  }),
  users: defineTable({
    user: v.string(),
    gems: v.int64()
  }),
});