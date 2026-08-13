import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, UserController.findAll);

router.get("/:id", authMiddleware, UserController.findById);

router.patch("/:id", authMiddleware, UserController.update);

router.delete("/:id", authMiddleware, UserController.delete);

export default router;