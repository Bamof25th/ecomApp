import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandeler from "../utils/utility-class.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let auser = await User.findById(_id);
    if (auser) {
      return res.status(201).json({
        success: true,
        message: `Welcome, ${auser.name}`,
      });
    }
    if (!name || !email || !photo || !gender || !_id || !dob) {
      return next(new ErrorHandeler("Please add all Fields", 400));
    }

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

export const getAllUsers = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});

    return res.status(200).json({ success: true, users });
  }
);

export const getUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) return next(new ErrorHandeler("Invalid Id", 400));

    return res.status(200).json({ success: true, user });
  }
);
export const deleteUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const user = await User.findById(_id);

    if (!user) return next(new ErrorHandeler("Invalid Id", 400));

    await user.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);
