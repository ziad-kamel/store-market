import { Router } from "express";
import * as controllers from "../../controllers/orders.controllers";
import Authorization from "../../middleware/authentication.middleware";

const routes = Router();

routes.route("/").post(Authorization, controllers.createOrder);
routes.route("/:id").get(Authorization, controllers.GetOrders);

export default routes;
