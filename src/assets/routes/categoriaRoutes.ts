import { Router } from "express";
import { CategoriaController } from "../controller/CategoriaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/categorias", authMiddleware, CategoriaController.findAll);

router.get("/categorias/:id", authMiddleware, CategoriaController.findById);

router.post("/categorias", authMiddleware, CategoriaController.create);

router.patch("/categorias/:id", authMiddleware, CategoriaController.update);

router.delete("/categorias/:id", authMiddleware, CategoriaController.delete);

export default router;