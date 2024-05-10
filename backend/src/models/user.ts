import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    // Virtual Attribute
    age: number;
}

const schema = new mongoose.Schema({

    _id: {
        type: String,
        required: [true, "Please Enter Id"],
    },
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please Enter your name"],
        validate: validator.default.isEmail
    },
    photo: {
        type: String,
        required: [true, "Please enter profile pic"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    dob: {
        type: Date,
        required: [true, "Please enter DOB"]
    }


}, {
    timestamps: true
}
);

schema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate()) {
        age--;
    }
    return age;
})


export const User = mongoose.model<IUser>("User", schema)