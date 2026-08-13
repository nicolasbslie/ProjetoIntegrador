import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Gasto } from "../models/Gasto";
import { User } from "../models/User";
import { Categoria } from "../models/Categoria";

const gastoRepository = AppDataSource.getRepository(Gasto);
const userRepository = AppDataSource.getRepository(User);
const categoriaRepository = AppDataSource.getRepository(Categoria);

export class GastoController {

    // Criar gasto
    static async create(req: Request, res: Response) {

        try {

            const {
                usuario_id,
                categoria_id,
                valor,
                descricao
            } = req.body;

            const usuario = await userRepository.findOne({
                where: { id: usuario_id }
            });

            if (!usuario) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            const categoria = await categoriaRepository.findOne({
                where: { id: categoria_id }
            });

            if (!categoria) {
                return res.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            const gasto = gastoRepository.create({
                usuario,
                categoria,
                valor,
                descricao
            });

            await gastoRepository.save(gasto);

            return res.status(201).json({
                message: "Gasto cadastrado com sucesso.",
                gasto
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar gasto.",
                error
            });
        }
    }

    // Listar todos os gastos
    static async findAll(req: Request, res: Response) {

        try {

            const gastos = await gastoRepository.find({
                relations: {
                    usuario: true,
                    categoria: true
                }
            });

            return res.status(200).json(gastos);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar gastos.",
                error
            });
        }
    }

    // Buscar gasto por ID
    static async findById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const gasto = await gastoRepository.findOne({
                where: { id },
                relations: {
                    usuario: true,
                    categoria: true
                }
            });

            if (!gasto) {
                return res.status(404).json({
                    message: "Gasto não encontrado."
                });
            }

            return res.status(200).json(gasto);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar gasto.",
                error
            });
        }
    }

    // Atualizar gasto
    static async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const gasto = await gastoRepository.findOne({
                where: { id },
                relations: {
                    categoria: true
                }
            });

            if (!gasto) {
                return res.status(404).json({
                    message: "Gasto não encontrado."
                });
            }

            const {
                valor,
                descricao,
                categoria_id
            } = req.body;

            if (valor !== undefined) {
                gasto.valor = valor;
            }

            if (descricao !== undefined) {
                gasto.descricao = descricao;
            }

            if (categoria_id) {

                const categoria = await categoriaRepository.findOne({
                    where: { id: categoria_id }
                });

                if (!categoria) {
                    return res.status(404).json({
                        message: "Categoria não encontrada."
                    });
                }

                gasto.categoria = categoria;
            }

            await gastoRepository.save(gasto);

            return res.status(200).json({
                message: "Gasto atualizado com sucesso.",
                gasto
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar gasto.",
                error
            });
        }
    }

    // Excluir gasto
    static async delete(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const gasto = await gastoRepository.findOne({
                where: { id }
            });

            if (!gasto) {
                return res.status(404).json({
                    message: "Gasto não encontrado."
                });
            }

            await gastoRepository.remove(gasto);

            return res.status(200).json({
                message: "Gasto removido com sucesso."
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao remover gasto.",
                error
            });
        }
    }

}