import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "../config/config.js";
import { connectDB } from "../db/database.js";
import routerProduct from "../routes/product.routes.js";
import routerUser from "../routes/user.routes.js";
import routerSales from "../routes/sales.routes.js";
import routerCart from "../routes/cart.routes.js";
import routerAuth from "../routes/auth.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await connectDB();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api/", routerAuth);
    this.app.use("/api/", routerProduct);
    this.app.use("/api/", routerUser);
    this.app.use("/api/", routerSales);
    this.app.use("/api/", routerCart);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionado en el puerto: " + this.port);
    });
  }
}

export default Server;
