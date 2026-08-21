import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Receita } from "../models/Receita";
import { User } from "../models/User";

const receitaRepository = AppDataSource.getRepository(Receita);
const userRepository = AppDataSource.getRepository(User);

export class ReceitaController {

    // Criar receita
    static async create(req: Request, res: Response) {

        try {

            const { valor, descricao } = req.body;

            // usuario logado (vem do token, via authMiddleware)
            const usuario_id = (req as any).user.id;

            const usuario = await userRepository.findOne({
                where: { id: usuario_id }
            });

            if (!usuario) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }

            const receita = receitaRepository.create({
                usuario,
                valor,
                descricao
            });

            await receitaRepository.save(receita);

            return res.status(201).json({
                message: "Receita cadastrada com sucesso.",
                receita
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar receita.",
                error
            });
        }
    }

    // Listar receitas
    static async findAll(req: Request, res: Response) {

        try {

            const receitas = await receitaRepository.find({
                relations: {
                    usuario: true
                }
            });

            return res.status(200).json(receitas);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar receitas.",
                error
            });
        }
    }

    // Listar apenas as receitas do usuário logado (pega o id pelo token/JWT)
    static async findMine(req: Request, res: Response) {

        try {

            const usuario_id = (req as any).user.id;

            const receitas = await receitaRepository.find({
                where: {
                    usuario: { id: usuario_id }
                },
                order: {
                    data_receita: "DESC"
                }
            });

            return res.status(200).json(receitas);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar suas receitas.",
                error
            });
        }
    }

    // Buscar receita por ID
    static async findById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const receita = await receitaRepository.findOne({
                where: { id },
                relations: {
                    usuario: true
                }
            });

            if (!receita) {
                return res.status(404).json({
                    message: "Receita não encontrada."
                });
            }

            return res.status(200).json(receita);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar receita.",
                error
            });
        }
    }

    // Atualizar receita
    static async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const receita = await receitaRepository.findOne({
                where: { id }
            });

            if (!receita) {
                return res.status(404).json({
                    message: "Receita não encontrada."
                });
            }

            const { valor, descricao } = req.body;

            if (valor !== undefined)
                receita.valor = valor;

            if (descricao !== undefined)
                receita.descricao = descricao;

            await receitaRepository.save(receita);

            return res.status(200).json({
                message: "Receita atualizada com sucesso.",
                receita
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar receita.",
                error
            });
        }
    }

    // Excluir receita
    static async delete(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const receita = await receitaRepository.findOne({
                where: { id }
            });

            if (!receita) {
                return res.status(404).json({
                    message: "Receita não encontrada."
                });
            }

            await receitaRepository.remove(receita);

            return res.status(200).json({
                message: "Receita removida com sucesso."
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao remover receita.",
                error
            });
        }
    }

}