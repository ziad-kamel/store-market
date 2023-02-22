import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configuration from "../configuration";
import Error from "../interface/error.interface";

const Authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticateHeader = req.get("authorization");
    if (authenticateHeader) {
      if (
        !(
          authenticateHeader.slice(7) &&
          authenticateHeader.substring(0, 6) == "Bearer"
        )
      ) {
        const error: Error = new Error(
          "an error ocured while login kindly try again"
        );
        error.status = 401;
        next(error);
      } else {
        const decodeToken = jwt.verify(
          authenticateHeader.slice(7),
          configuration.token as string
        );
        if (!decodeToken) {
          const error: Error = new Error(
            "an error ocured while login kindly try again"
          );
          error.status = 401;
          next(error);
        } else {
          next();
        }
      }
    } else {
      const error: Error = new Error(
        "an error ocured while login kindly try again"
      );
      error.status = 401;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};
export default Authorization;
