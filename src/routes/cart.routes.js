import CartCrtl from "../controllers/cart.controllers.js";
import { Router } from "express";
import {
  cartValidation,
  validateRecord,
} from "../models/SchemasValidator/CartSchema.js";
const router = Router();

const cartCtrl = new CartCrtl();

router.get("/cart/:userId", cartCtrl.getCart.bind(cartCtrl));

router.post(
  "/cart/:userId/add",
  cartValidation,
  validateRecord,
  cartCtrl.addItemToCart.bind(cartCtrl),
);

router.put("/cart/clear/:cartId", cartCtrl.clearCart.bind(cartCtrl));

export default router;
