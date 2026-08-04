import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Categoria } from "../models/Categoria";

const categoriaRepository = AppDataSource.getRepository(Categoria);

export class CategoriaController {

    // Criar categoria
    static async create(req: Request, res: Response) {

        try {

            const { nome } = req.body;

            if (!nome) {
                return res.status(400).json({
                    message: "Informe o nome da categoria."
                });
            }

            const categoriaExiste = await categoriaRepository.findOne({
                where: { nome }
            });

            if (categoriaExiste) {
                return res.status(400).json({
                    message: "Categoria já cadastrada."
                });
            }

            const categoria = categoriaRepository.create({
                nome
            });

            await categoriaRepository.save(categoria);

            return res.status(201).json({
                message: "Categoria cadastrada com sucesso.",
                categoria
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao cadastrar categoria.",
                error
            });
        }
    }

    // Listar categorias
    static async findAll(req: Request, res: Response) {

        try {

            const categorias = await categoriaRepository.find();

            return res.status(200).json(categorias);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar categorias.",
                error
            });
        }
    }

    // Buscar categoria por ID
    static async findById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const categoria = await categoriaRepository.findOne({
                where: { id }
            });

            if (!categoria) {
                return res.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            return res.status(200).json(categoria);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar categoria.",
                error
            });
        }
    }

    // Atualizar categoria
    static async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const categoria = await categoriaRepository.findOne({
                where: { id }
            });

            if (!categoria) {
                return res.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            const { nome } = req.body;

            if (nome) {
                categoria.nome = nome;
            }

            await categoriaRepository.save(categoria);

            return res.status(200).json({
                message: "Categoria atualizada com sucesso.",
                categoria
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar categoria.",
                error
            });
        }
    }

    // Excluir categoria
    static async delete(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const categoria = await categoriaRepository.findOne({
                where: { id }
            });

            if (!categoria) {
                return res.status(404).json({
                    message: "Categoria não encontrada."
                });
            }

            await categoriaRepository.remove(categoria);

            return res.status(200).json({
                message: "Categoria removida com sucesso."
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao remover categoria.",
                error
            });
        }
    }

}