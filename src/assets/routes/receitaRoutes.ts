import { Router } from "express";
import { ReceitaController } from "../controller/ReceitaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/receitas", authMiddleware, ReceitaController.create);

router.get("/receitas", authMiddleware, ReceitaController.findAll);

router.get("/receitas/:id", authMiddleware, ReceitaController.findById);

router.patch("/receitas/:id", authMiddleware, ReceitaController.update);

router.delete("/receitas/:id", authMiddleware, ReceitaController.delete);

export default router;