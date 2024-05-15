import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";

export const newOrder = TryCatch(
  async (
    req: Request<{}, {}, NewOrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      shippingInfo,
      orderItems,
      user,
      tax,
      subtotal,
      shippingCharges,
      total,
      discount,
    } = req.body;

    await Order.create({
      shippingInfo,
      orderItems,
      user,
      tax,
      subtotal,
      shippingCharges,
      total,
      discount,
    });

    

  }
);
