import SalesCtrl from "../controllers/sales.controllers.js";
import { Router } from "express";
const router = Router();

const salesCtrl = new SalesCtrl();

//apis
router.get("/sales", salesCtrl.getSales);

router.get("/sales/:id", salesCtrl.getSale);

router.get("/sales/user/:userId", salesCtrl.findSalesByUser);

export default router;
