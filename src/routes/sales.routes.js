import SalesCtrl from "../controllers/sales.controllers.js";
import { Router } from "express";
import {
  saleValidation,
  validateRecord,
} from "../models/SchemasValidator/SaleSchema.js";
const router = Router();

const salesCtrl = new SalesCtrl();

//apis
router.get("/sales", salesCtrl.getSales.bind(salesCtrl));

router.get("/sales/:id", salesCtrl.getSale.bind(salesCtrl));

router.get("/sales/user/:userId", salesCtrl.findSalesByUser.bind(salesCtrl));

router.post(
  "/sales",
  saleValidation,
  validateRecord,
  salesCtrl.createSale.bind(salesCtrl),
);

export default router;
