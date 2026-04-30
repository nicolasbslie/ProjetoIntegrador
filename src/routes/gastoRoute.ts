import { Router } from "express";
import { conexao } from "../config/database";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { usuario_id, valor, categoria_id, descricao } = req.body;

    await conexao.query(
      "INSERT INTO gastos (usuario_id, valor, categoria_id, descricao) VALUES (?, ?, ?, ?)",
      [usuario_id, valor, categoria_id, descricao]
    );

    res.json({ message: "Gasto salvo" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar gasto" });
  }
});

router.get("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  const [rows] = await conexao.query(
    "SELECT * FROM gastos WHERE usuario_id = ?",
    [usuario_id]
  );

  res.json(rows);
});

export default router;