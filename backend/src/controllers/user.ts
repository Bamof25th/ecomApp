import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUSerRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUSerRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    const user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    user.save();
    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);
