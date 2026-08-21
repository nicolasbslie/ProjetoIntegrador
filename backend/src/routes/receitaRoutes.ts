import { Router } from "express";
import { ReceitaController } from "../controller/ReceitaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, ReceitaController.create);

router.get("/", authMiddleware, ReceitaController.findAll);

router.get("/me", authMiddleware, ReceitaController.findMine);

router.get("/:id", authMiddleware, ReceitaController.findById);

router.patch("/:id", authMiddleware, ReceitaController.update);

router.delete("/:id", authMiddleware, ReceitaController.delete);

export default router;