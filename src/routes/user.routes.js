import { Router } from "express";
import UserCtrl from "../controllers/user.controllers.js";

const router = Router();

const userCtrl = new UserCtrl();

//apis
router.get("/users", userCtrl.getUsers.bind(userCtrl));
router.post("/users", userCtrl.createUser.bind(userCtrl));
router.get("/users/:id", userCtrl.getUser.bind(userCtrl));
router.put("/users/:id", userCtrl.updateUser.bind(userCtrl));
router.delete("/users/:id", userCtrl.deleteUser.bind(userCtrl));

export default router;
