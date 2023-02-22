import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import Ratelimit from "express-rate-limit";
import errormiddleware from "./middleware/error.middleware";
import configuration from "./configuration";
import routes from "./routes";
import path from "path";
import session from "express-session";
const port = configuration.port || 3000;
const app: Application = express();

const viewsStaticPath = path.join("dist", "views");
app.use(express.static(viewsStaticPath));

app.set("views", viewsStaticPath);
app.set("view engine", "ejs");

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(
  Ratelimit({
    windowMs: 60 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: "too many request",
  })
);
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 30000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", routes);
app.post("/login", (req: Request, res: Response) => {
  console.log(req.signedCookies);

  res.send(200);
});
app.get("/", (req: Request, res: Response) => {
  res.render("index");
});
app.get("/shop", (req: Request, res: Response) => {
  res.render("shop");
});
app.get("/about", (req: Request, res: Response) => {
  res.render("about");
});
app.get("/contact", (req: Request, res: Response) => {
  res.render("contact");
});

app.get("/product", (req: Request, res: Response) => {
  res.render("product");
});
app.get("/account", (req: Request, res: Response) => {
  res.render("account");
});
app.get("/orders", (req: Request, res: Response) => {
  res.render("orders");
});
app.get("/refund", (req: Request, res: Response) => {
  res.render("refund");
});
app.get("/terms", (req: Request, res: Response) => {
  res.render("terms");
});
app.get("/cart", (req: Request, res: Response) => {
  res.render("cart");
});
app.get("/checkout", (req: Request, res: Response) => {
  res.render("checkout");
});

app.use(errormiddleware);
app.use((_req: Request, _res: Response) => {
  _res.status(404).json({
    message: "you are lost",
  });
});

app.listen(port, () => {
  console.log(`server run at port ${port}`);
});

export default app;
