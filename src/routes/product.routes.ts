import ProductCtrl from "../controllers/product.controllers";
import { Router } from "express";
import {
  productValidation,
  validateRecord,
} from "../models/SchemasValidator/ProductShema.js";

const router = Router();
const productCtrl = new ProductCtrl();

// APIs
router.get("/products", productCtrl.getProducts.bind(productCtrl));

router.get("/products/:id", productCtrl.getProduct.bind(productCtrl));

router.post(
  "/products",
  productValidation,
  validateRecord,
  productCtrl.createProduct.bind(productCtrl),
);

router.put("/products/:id", productCtrl.updateProduct.bind(productCtrl));

router.delete("/products/:id", productCtrl.deleteProduct.bind(productCtrl));

export default router;
