import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "Ecomdb_24",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "all-product",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    productKeys.push();
    if (typeof productId === "object")
      productId.forEach((e) => {
        productKeys.push(`product-${e}`);
      });
    productKeys.push();

    myCache.del(productKeys);
  }
  if (order) {
    //
    const orderKeys: string[] = [
      "all-order",
      `my-order-${userId}]`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];

    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not Found");

    product.stock -= order.quantity;

    await product.save();
  }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth === 0) return thisMonth * 100;
  const percentage = ((thisMonth - lastMonth) / lastMonth) * 100;
  return Number(percentage.toFixed(0));
};
