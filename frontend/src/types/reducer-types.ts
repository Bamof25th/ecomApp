import { CartItem, ShippingInfo, User } from "./types";

export interface userReducerInitaialState {
  user: User | null;
  loading: boolean;
}
export interface cartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
