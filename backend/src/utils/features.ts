import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
const url = "mongodb://127.0.0.1:27017";
export const connectDB = () => {
  mongoose
    .connect(url, {
      dbName: "Ecomdb_24",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "all-product",
    ];
    // `product-${id}`

    const products = await Product.find({}).select("_id");
    products.forEach((e) => {
      productKeys.push(`product-${e._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
