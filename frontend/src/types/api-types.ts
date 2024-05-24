import { Product, User } from "./types";

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
