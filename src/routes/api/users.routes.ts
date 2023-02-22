import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import Authorization from "../../middleware/authentication.middleware";

const routes = Router();
routes
  .route("/")
  .get(Authorization, controllers.GetUsers)
  .post(controllers.CreateUser);
routes.route("/:id").get(Authorization, controllers.GetOneUser);

routes.route("/authenticate").post(controllers.AuthenticateUser);

export default routes;
