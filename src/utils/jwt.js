import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const createToken = (user) => {
  try {
    const token = jsonwebtoken.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
    if (!token) {
      throw new Error("Failed to create token");
    }
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const decodedToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error("Failed to decode token");
    }
    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
