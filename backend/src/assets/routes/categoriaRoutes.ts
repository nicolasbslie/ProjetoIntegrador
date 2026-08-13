import { Router } from "express";
import { CategoriaController } from "../controller/CategoriaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, CategoriaController.findAll);

router.get("/:id", authMiddleware, CategoriaController.findById);

router.post("/", authMiddleware, CategoriaController.create);

router.patch("/:id", authMiddleware, CategoriaController.update);

router.delete("/:id", authMiddleware, CategoriaController.delete);

export default router;