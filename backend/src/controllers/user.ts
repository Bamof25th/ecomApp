import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUSerRequestBody } from "../types/types.js";

export const newUser = async (req: Request<{}, {}, NewUSerRequestBody>, res: Response, next: NextFunction) => {

    try {
        const { name, email, photo, gender, role, _id, dob } = req.body;

        const user = await User.create({
            
        })

        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        })

    } catch (error) {

    }


}