import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stocks: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    timestamp: v.number(), //store as number of ms to convert to Date object
    user: v.id("users"),
  }),
  users: defineTable({
    id: v.id(),
    name: v.string(),
    hashedPassword: v.string(),
    isParent: v.boolean(),
  }),
  stocksOwned: defineTable({
    name: v.symbol("stocks"),
    quantity: v.int64(),
    user: v.id("users"),
  }),
});