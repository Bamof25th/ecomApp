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
  categories: string[];
};

export type SearchProductsResponce = {
  success: string;
  products: Product[];
  totalPage: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
export type NewProductRequest = {
  id: number;
  formData: FormData;
};
