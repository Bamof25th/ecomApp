import { NextFunction, Request, Response } from "express";
import ErrorHandeler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
  err: ErrorHandeler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Imternal server erroe";
  err.statusCode ||= 500;
  return res.status(400).send({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
  });
};

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
