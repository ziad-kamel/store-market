import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.createproduct(req.body);
    res.json({
      Comment: `succes to create a user with id:${product.id}`,
      productInfo: {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const GetProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getProducts();
    res.json({
      Comment: "succes to get a list of all products in DB",
      products: [...products],
    });
  } catch (error) {
    next(error);
  }
};

export const GetOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.getOneProduct(req.params.id as string);
    res.json({
      message: "product retrived succesfully",
      productInfo: { id: product.id, name: product.name, price: product.price },
    });
  } catch (error) {
    next(error);
  }
};
