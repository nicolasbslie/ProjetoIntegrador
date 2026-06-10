import express from 'express';
import { pool } from './database'

const app = express()

const PORT = 3000

app.use(express.json())

app.get('/usuarios', async (req, res) => {
    try{
        const [usuarios] = await pool.query(
            'SELECT * FROM usuarios'
        )

        res.status(200).json(usuarios)
    } catch(erro) {
        console.log("erro", erro)
        return res.status(500).json("Erro ao buscar usuário" + erro)
    }
})

//Cria usuários
app.post('/usuarios', async (req, res) =>{
    try{
        const {nome, idade, email, senha} = req.body
        const [resultado] = await pool.query(
            "INSERT INTO usuarios (nome, idade, email, senha) VALUES (?, ?, ?)", [nome, idade, email, senha]
        )

        return res.status(201).json("Usuário criado com sucesso")
    } catch (erro){
        return res.status(500).json("Erro interno do servidor: " + erro)
    }
})

//Por o servidor no ar
app.listen(PORT, () =>{
    console.log("O servidor está no ar")
})