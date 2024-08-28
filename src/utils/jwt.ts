import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { NumberExpression } from "mongoose";

const secret: NonNullable<string> =
  JWT_SECRET ?? // el operador ?? es un operador de fusión nula que devuelve su operando derecho cuando su operando izquierdo es null o undefined, y de lo contrario devuelve su operando izquierdo.
  (() => {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  })();

export const createToken = (user: string) => {
  try {
    const token = jsonwebtoken.sign({ user }, secret, { expiresIn: "1h" }); // Coma agregada
    if (!token) {
      throw new Error("Failed to create token");
    }
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const decodeToken = (token: string) => {
  // Cambié el nombre a decodeToken para seguir las convenciones de nombres en inglés.
  try {
    const decoded = jsonwebtoken.verify(token, secret);
    if (!decoded) {
      throw new Error("Failed to decode token");
    }
    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
