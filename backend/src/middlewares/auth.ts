import { NextFunction, Request, Response } from "express";
import { TryCatch } from "./error.js";
import ErrorHandeler from "../utils/utility-class.js";
import { User } from "../models/user.js";

// middleware to make shure only admin is allowed
export const adminOnly = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandeler("Login first to access", 401));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandeler("Invalid Id", 401));

    if (user.role !== "admin")
      return next(new ErrorHandeler("Only for admins", 401));

    next();
  }
);
