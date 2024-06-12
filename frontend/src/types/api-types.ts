import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: string;
  message: string;
};
export type AllUserResponce = {
  success: boolean;
  users: User[];
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
  subtotal: number;
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

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type AllOrdersResponce = {
  success: boolean;
  orders: Order[];
};
export type OrderDetailResponce = {
  success: boolean;
  order: Order;
};
export type StatsResponce = {
  success: boolean;
  stats: Stats;
};
export type PieResponce = {
  success: boolean;
  charts: Pie;
};
export type BarResponce = {
  success: boolean;
  charts: Bar;
};
export type LineResponce = {
  success: boolean;
  charts: Line;
};
