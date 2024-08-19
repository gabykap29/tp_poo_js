import { config } from "dotenv";

// Configurar dotenv para usar el archivo .envDev
config({ path: ".envDev" });

export const PORT = process.env.PORT;
export const URI = process.env.URI;
export const JWT_SECRET = process.env.JWT_SECRET;
