import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandeler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const myOrders = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: user } = req.query;

    const key = `my-orders-${user}`;

    let orders = [];

    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
      orders = await Order.find({ user });
      myCache.set(key, JSON.stringify(orders));
    }

    res.status(201).json({ success: true, orders });
  }
);

export const allOrders = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const key = `my-order`;

    let orders = [];

    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
      orders = await Order.find().populate("user", "name");
      myCache.set(key, JSON.stringify(orders));
    }

    res.status(201).json({ success: true, orders });
  }
);

export const getSingleOrders = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const key = `order-${id}`;

    let order;

    if (myCache.has(key)) order = JSON.parse(myCache.get(key) as string);
    else {
      order = await Order.findById(id).populate("user", "name");
      if (!order) return next(new ErrorHandeler("Order Not Found", 404));
      myCache.set(key, JSON.stringify(order));
    }

    res.status(201).json({ success: true, order });
  }
);

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

    if (
      !shippingInfo ||
      !orderItems ||
      !user ||
      !tax ||
      !subtotal ||
      !shippingCharges ||
      !total ||
      !discount
    )
      return next(new ErrorHandeler("Please Enter All Feilds", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      tax,
      subtotal,
      shippingCharges,
      total,
      discount,
    });

    await reduceStock(orderItems);

    await invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: String(user),
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully" });
  }
);

export const processOrder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandeler("Order NOt Found", 404));

    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Delivered";
        break;
    }
    await order.save();
    await invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user,
      orderId: String(order._id),
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    res
      .status(200)
      .json({ success: true, message: "Order Processed Successfully" });
  }
);
export const deleteOrder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandeler("Order NOt Found", 404));

    await order.deleteOne();

    await invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user,
      orderId: String(order._id),
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    res
      .status(200)
      .json({ success: true, message: "Order Deleted Successfully" });
  }
);
