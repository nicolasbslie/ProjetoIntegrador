import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "../models/User";
import { Categoria } from "../models/Categoria";
import { Receita } from "../models/Receita";
import { Gasto } from "../models/Gasto";

export const AppDataSource = new DataSource({
    type: "mysql",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USER,
    password: process.env.DB_PWD,

    database: process.env.DB_NAME,

    synchronize: true,
    logging: false,

    entities: [
        User,
        Categoria,
        Receita,
        Gasto
    ],

    migrations: [],
    subscribers: []
});