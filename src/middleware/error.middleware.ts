import { NextFunction } from "express";
import express, { Application, Request, Response } from "express";
import Error from "../interface/error.interface";
const errormiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "obs";
  res.status(status).json({ status, message });
};

export default errormiddleware;
