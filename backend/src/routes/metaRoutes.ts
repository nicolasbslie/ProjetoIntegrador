import { Router } from "express";

import { MetaController } from "../controller/MetaController";

import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();


// Criar meta
router.post(
    "/",
    authMiddleware,
    MetaController.create
);


// Listar minhas metas
router.get(
    "/me",
    authMiddleware,
    MetaController.findMine
);


// Atualizar meta
router.patch(
    "/:id",
    authMiddleware,
    MetaController.update
);


// Excluir meta
router.delete(
    "/:id",
    authMiddleware,
    MetaController.delete
);


export default router;