import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await connect("mongodb://localhost:27017/ecommerce");
    console.log("Conectado a la base de datos", connection.connection.name);
  } catch (error) {
    console.log("Error al conectar a la bd", error);
  }
};
