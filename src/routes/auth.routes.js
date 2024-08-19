import AuthCtrl from "../controllers/auth.controllers.js";

import { Router } from "express";

const router = Router();

const authCtrl = new AuthCtrl();

router.post("/login", authCtrl.login.bind(authCtrl));

router.post("/register", authCtrl.register.bind(authCtrl));

export default router;
