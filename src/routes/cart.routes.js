import CartCrtl from "../controllers/cart.controllers.js";
import { Router } from "express";

const router = Router();

const cartCtrl = new CartCrtl();

router.post("/:userId", cartCtrl.createCart);

router.get("/:userId", cartCtrl.getCart);

router.post("/:userId/add", cartCtrl.addItemToCart);

router.delete("/:userId/remove/:productId", cartCtrl.removeItemFromCart);

export default router;
