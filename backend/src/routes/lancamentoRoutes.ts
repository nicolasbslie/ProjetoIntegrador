import { Router } from "express";
import { LancamentoController } from "../controller/LancamentoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.patch("/:tipoAtual/:id/tipo", authMiddleware, LancamentoController.changeType);

export default router;
