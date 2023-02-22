import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import configuration from "../configuration";

const Model = new UserModel();

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Model.createuser(req.body);
    res.json({
      Comment: `succes to create a user with id: ${user.id}`,
      userInfo: {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const GetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await Model.getUsers();
    res.json({
      Comment: "succes to get a list of all users in DB ",
      users: { ...users },
    });
  } catch (error) {
    next(error);
  }
};

export const GetOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Model.getOneUser(req.params.id as unknown as string);
    res.json({
      Comment: `succes to get a user of id: ${user.id}`,
      userInfo: {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await Model.authenticateUser(email, password);
    const token = jwt.sign({ user }, configuration.token as string);
    if (!user) {
      return res.status(404).json({
        warning: "error",
        Comment: "the username and password do not match please try again",
      });
    }
    return res.json({
      Comment: `user of id: ${user.id} is now authenticated`,
      userInfo: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
