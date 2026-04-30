import { Router } from "express";
import { createUser, findUserByLogin } from "../repositories/user_repo";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    await createUser(req.body);
    res.json({ message: "Usuário cadastrado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await findUserByLogin(email, senha);

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Login inválido" });
  }
});

export default router;