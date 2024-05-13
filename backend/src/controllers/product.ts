import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandeler from "../utils/utility-class.js";
import { rm } from "fs";
import { faker } from "@faker-js/faker";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandeler("Please add Image", 400));

    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("Deleted");
      });

      return next(new ErrorHandeler("please fill all the feilds", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    return res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  }
);

export const getlatestProducts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(201).json({ success: true, products });
  }
);

export const getAllCategories = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Product.distinct("category");
    return res.status(201).json({ success: true, categories });
  }
);

export const getAdminProducts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({});
    return res.status(201).json({ success: true, products });
  }
);

export const getSingleProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandeler("Product Not Found", 404));
    return res.status(201).json({ success: true, product });
  }
);

export const updateProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandeler("Invalid Product Id", 404));

    if (photo) {
      rm(product.photo, () => {
        console.log("Old Image Deleted");
      });

      product.photo = photo.path;
    }
    if (name) product.name = name;
    if (stock) product.stock = stock;
    if (price) product.price = price;
    if (category) product.category = category.toLowerCase();

    await product.save();

    return res
      .status(201)
      .json({ success: true, message: "Product Updated successfully" });
  }
);

export const deleteProduct = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandeler("Product Not Found", 404));
    rm(product.photo, () => {
      console.log("Product Photo deleted");
    });
    await product.deleteOne();
    return res
      .status(201)
      .json({ success: true, message: "Product Deleted successfully" });
  }
);

export const getAllProducts = TryCatch(
  async (
    req: Request<{}, {}, {}, SearchRequestQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page);

    // 2
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      baseQuery.category = category;
    }
    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    const productsPromice = await Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProducts] = await Promise.all([
      productsPromice,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProducts.length / limit); // celing cvvalue 21.5 => 22

    return res.status(201).json({ success: true, products, totalPage });
  }
);

// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];
//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\5717be87-3413-4e3b-acc6-cb16b2ae0006.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 80, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };
//     products.push(product);
//   }
//   await Product.create(products);

//   console.log({ success: true });
// };

// generateRandomProducts(40);

// const deleteRandoms = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);
  
//   for (let i = 0; i < products.length; i++) {
//   const product = products[i];
//   await product.deleteOne();
//   }
//   console.log({ succecss: true });
//   };

  // deleteRandoms(40)