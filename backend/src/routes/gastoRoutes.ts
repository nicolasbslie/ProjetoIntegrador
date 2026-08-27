import { Router } from "express";
import { GastoController } from "../controller/GastoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, GastoController.create);

router.get("/", authMiddleware, GastoController.findAll);

router.get("/me", authMiddleware, GastoController.findMine);

router.get("/:id", authMiddleware, GastoController.findById);

router.patch("/:id", authMiddleware, GastoController.update);

router.delete("/:id", authMiddleware, GastoController.delete);

export default router;