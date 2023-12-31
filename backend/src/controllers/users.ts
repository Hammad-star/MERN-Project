import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bycrypt from "bcrypt";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters required");
    }

    const existingUser = await UserModel.findOne({ username: username }).exec();

    if (existingUser) {
      throw createHttpError(409, "Username already exists");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email already exists. Please log in instead."
      );
    }

    const passwordHashed = await bycrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    }); // create a new document in memory

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
