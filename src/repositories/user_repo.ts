import { ResultSetHeader, RowDataPacket } from "mysql2";
import { conexao } from "../config/database";
import { User } from "../models/user";

export class UserRepository {
    async mostrarTodos(){
        const [resultados] = await conexao.query<RowDataPacket[]>('SELECT * FROM users')
        return resultados.map((u) => new user(u.id, u.nome, u.idade, u.email))
    }

    async inserir(nome: string, email: string): Promise<User> {
        const [resultado] = await conexao.execute<ResultSetHeader>('INSERT INTO users (nome, email) VALUES (?, ?)', [nome, email])
        return new user(resultado.insertId, nome, idade, email)
    }
}