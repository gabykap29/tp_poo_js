import { decodedToken } from "../utils/jwt.js";

export const checkRolAdmin = (user) => {
  try {
    const token = user.token;
    const decoded = decodedToken(token);
    if (decoded.user.rol === "admin") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkRolClient = (user) => {
  try {
    const token = user.token;
    const decoded = decodedToken(token);
    if (decoded.user.rol === "client") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkRolSeller = (user) => {
  try {
    const token = user.token;
    const decoded = decodedToken(token);
    if (decoded.user.rol === "seller") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
