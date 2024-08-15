import { crtlProducts } from "../controllers/product.controllers.js";
import { Router } from "express";
const router = Router();

//apis
router.get("/products", crtlProducts.getProducts);

router.get("/products/:id", crtlProducts.getProduct);

router.post("/products", crtlProducts.createProduct);

router.put("/products/:id", crtlProducts.updateProduct);

export default router;
