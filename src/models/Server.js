import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "../config/config.js";
import { connectDB } from "../db/database.js";
import routerProduct from "../routes/product.routes.js";

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
    this.app.use("/api/", routerProduct);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionado en el puerto: " + this.port);
    });
  }
}

export default Server;
