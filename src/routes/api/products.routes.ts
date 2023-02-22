import { Router } from "express";
import * as controllers from "../../controllers/products.controllers";
import Authorization from "../../middleware/authentication.middleware";

const route = Router();
route
  .route("/")
  .get(controllers.GetProducts)
  .post(Authorization, controllers.createProduct);
route.route("/:id").get(controllers.GetOneProduct);
export default route;
