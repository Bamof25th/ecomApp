import { NextFunction, Response, Request } from "express";
import { TryCatch } from "../middlewares/error.js";

export const newOrder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    
  }
);
