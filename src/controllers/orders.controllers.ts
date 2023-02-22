import { NextFunction, Request, Response } from "express";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.createOrder(req.body);
    res.json({
      Comment: `succes to create a user with id:${order.id}`,
      orderInfo: {
        id: order.id,
        product_id: order.product_id,
        user_id: order.user_id,
        quantity: order.quantity,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const GetOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getOrders(req.params.id as string);
    res.json({
      Comment: `succes to get a list of all users in DB`,
      orders: {
        order_id: orders[0],
        by: orders[1],
        products: orders[2],
        quanitty: orders[3],
      },
    });
  } catch (error) {
    next(error);
  }
};
