type env = string | undefined;
import { config } from "dotenv";

// Configurar dotenv para usar el archivo .envDev
config({ path: ".envDev" });

export const PORT: env = process.env.PORT;
export const URI: env = process.env.URI;
export const JWT_SECRET: env = process.env.JWT_SECRET;
