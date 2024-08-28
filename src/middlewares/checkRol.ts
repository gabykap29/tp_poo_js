import { decodeToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkRole = (user: { token: string }, role: string): boolean => {
  try {
    const token = user.token;
    const decoded = decodeToken(token);

    // se verifica si el token decodificado es un objeto (JwtPayload) y tiene la propiedad `user`
    if (
      typeof decoded === "object" &&
      (decoded as JwtPayload).user?.rol === role
    ) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkRolAdmin = (user: { token: string }): boolean => {
  return checkRole(user, "admin");
};

export const checkRolClient = (user: { token: string }): boolean => {
  return checkRole(user, "client");
};

export const checkRolSeller = (user: { token: string }): boolean => {
  return checkRole(user, "seller");
};
