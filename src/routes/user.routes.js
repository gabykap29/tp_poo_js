import { Router } from "express";
import UserCtrl from "../controllers/user.controllers.js";

const router = Router();

const userCtrl = new UserCtrl();

//apis
router.get("/users", userCtrl.getUsers);

router.get("/users/:id", userCtrl.getUser);

router.post("/users", userCtrl.createUser);

router.put("/users/:id", userCtrl.updateUser);

router.delete("/users/:id", userCtrl.deleteUser);

export default router;
