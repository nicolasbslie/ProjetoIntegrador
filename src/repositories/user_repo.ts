import { conexao } from "../config/database";
import { User } from "../models/user";

export async function createUser(user: User) {
  const { nome, idade, email, senha } = user;

  await conexao.query(
    "INSERT INTO usuarios (nome, idade, email, senha) VALUES (?, ?, ?, ?)",
    [nome, idade, email, senha]
  );
}

export async function findUserByLogin(email: string, senha: string) {
  const [rows]: any = await conexao.query(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha]
  );

  return rows[0];
}