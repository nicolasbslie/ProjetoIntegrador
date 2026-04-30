import express from "express";
import cors from "cors";

import userRoutes from "./routes/usuarioRoute";
import gastoRoutes from "./routes/gastoRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/gastos", gastoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});