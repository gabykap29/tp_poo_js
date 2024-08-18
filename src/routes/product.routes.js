import ProductCtrl from "../controllers/product.controllers.js";
import { Router } from "express";
const router = Router();

const productCrtl = new ProductCtrl();
//apis
router.get("/products", productCrtl.getProducts);

router.get("/products/:id", productCrtl.getProduct);

router.post("/products", productCrtl.createProduct);

router.put("/products/:id", productCrtl.updateProduct);

export default router;
