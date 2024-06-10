import { CartItem, Order, Product, ShippingInfo, User } from "./types";

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
export type ProductDeatailsResponce = {
  success: boolean;
  product: Product;
};
export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  orderItems: CartItem[];
  shippingInfo: ShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type AllOrdersResponce = {
  success: boolean;
  orders: Order[];
};
export type OrderDetailResponce = {
  success: boolean;
  order: Order;
};
