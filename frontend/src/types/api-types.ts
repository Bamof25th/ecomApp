import { Product, User } from "./types";

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponce = {
  success: string;
  message: string;
};
export type UserResponce = {
  success: string;
  user: User;
};
export type AllProductsResponce = {
  success: string;
  products: Product[];
};
export type CategoriesResponce = {
  success: string;
  products: string[];
};
