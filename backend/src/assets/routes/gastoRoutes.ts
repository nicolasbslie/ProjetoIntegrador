import { Router } from "express";
import { GastoController } from "../controller/GastoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/gastos", authMiddleware, GastoController.create);

router.get("/gastos", authMiddleware, GastoController.findAll);

router.get("/gastos/:id", authMiddleware, GastoController.findById);

router.patch("/gastos/:id", authMiddleware, GastoController.update);

router.delete("/gastos/:id", authMiddleware, GastoController.delete);

export default router;