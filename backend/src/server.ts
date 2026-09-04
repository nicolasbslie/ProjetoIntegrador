import "reflect-metadata";
import "dotenv/config";

import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { AppDataSource } from "./config/data-source";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import receitaRoutes from "./routes/receitaRoutes";
import gastoRoutes from "./routes/gastoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import lancamentoRoutes from "./routes/lancamentoRoutes";

import { errorHandler } from "./middlewares/errorHandler";


const app: Application = express();

const PORT = Number(process.env.PORT) || 3000;


// ==============================
// MIDDLEWARES
// ==============================

app.use(
    cors({
        origin: "http://127.0.0.1:5502", 
        credentials: true,
        methods: [
            "GET",
            "POST",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


app.use(cookieParser());



// ==============================
// ROTAS
// ==============================

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/receitas", receitaRoutes);

app.use("/gastos", gastoRoutes);

app.use("/categorias", categoriaRoutes);

app.use("/lancamentos", lancamentoRoutes);



// ==============================
// ROTA TESTE
// ==============================

app.get("/", (req, res) => {

    res.json({
        message: "API EcoSpending funcionando"
    });

});



// ==============================
// TRATAMENTO DE ERROS
// ==============================

app.use(errorHandler);



// ==============================
// BANCO + SERVIDOR
// ==============================

AppDataSource.initialize()

.then(() => {

    console.log("Banco conectado!");

    app.listen(PORT, () => {

        console.log(
            `Servidor rodando em http://localhost:${PORT}`
        );

    });

})


.catch((error) => {

    console.error(
        "Erro ao conectar no banco:",
        error
    );

});