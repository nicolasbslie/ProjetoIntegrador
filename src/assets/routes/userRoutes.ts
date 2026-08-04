import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authMiddleware, UserController.findAll);

router.get("/users/:id", authMiddleware, UserController.findById);

router.patch("/users/:id", authMiddleware, UserController.update);

router.delete("/users/:id", authMiddleware, UserController.delete);

export default router;