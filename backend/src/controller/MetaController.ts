import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";

import { Meta } from "../models/Meta";
import { Categoria } from "../models/Categoria";
import { Gasto } from "../models/Gasto";


export class MetaController {

    // ==========================================
    // CRIAR META
    // ==========================================

    static async create(req: Request, res: Response) {

        try {

            const userId = (req as any).user.id;

            const {
                categoria_id,
                valor_limite,
                mes,
                ano
            } = req.body;


            if (!categoria_id || !valor_limite || !mes || !ano) {

                return res.status(400).json({
                    message: "Todos os campos são obrigatórios."
                });

            }


            if (Number(valor_limite) <= 0) {

                return res.status(400).json({
                    message: "O valor da meta deve ser maior que zero."
                });

            }


            const categoriaRepository =
                AppDataSource.getRepository(Categoria);

            const categoria =
                await categoriaRepository.findOne({
                    where: {
                        id: Number(categoria_id)
                    }
                });


            if (!categoria) {

                return res.status(404).json({
                    message: "Categoria não encontrada."
                });

            }


            const metaRepository =
                AppDataSource.getRepository(Meta);


            // Verifica se já existe uma meta
            // para essa categoria nesse mês

            const metaExistente =
                await metaRepository.findOne({
                    where: {
                        usuario: {
                            id: userId
                        },
                        categoria: {
                            id: Number(categoria_id)
                        },
                        mes: Number(mes),
                        ano: Number(ano)
                    }
                });


            if (metaExistente) {

                return res.status(409).json({
                    message:
                        "Você já possui uma meta para essa categoria neste mês."
                });

            }


            const meta =
                metaRepository.create({

                    usuario: {
                        id: userId
                    },

                    categoria: {
                        id: Number(categoria_id)
                    },

                    valor_limite: Number(valor_limite),

                    mes: Number(mes),

                    ano: Number(ano)

                });


            const novaMeta =
                await metaRepository.save(meta);


            return res.status(201).json({
                message: "Meta criada com sucesso.",
                meta: novaMeta
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao criar meta."
            });

        }

    }


    // ==========================================
    // LISTAR METAS DO USUÁRIO
    // ==========================================

    static async findMine(req: Request, res: Response) {

        try {

            const userId = (req as any).user.id;

            const mes =
                Number(req.query.mes) ||
                new Date().getMonth() + 1;

            const ano =
                Number(req.query.ano) ||
                new Date().getFullYear();


            const metaRepository =
                AppDataSource.getRepository(Meta);


            const metas =
                await metaRepository.find({

                    where: {

                        usuario: {
                            id: userId
                        },

                        mes,

                        ano

                    },

                    relations: {
                        categoria: true
                    },

                    order: {
                        id: "DESC"
                    }

                });


            const gastoRepository =
                AppDataSource.getRepository(Gasto);


            const resultado = [];


            for (const meta of metas) {

                const inicioMes =
                    new Date(ano, mes - 1, 1);

                const fimMes =
                    new Date(ano, mes, 1);


                const gastos =
                    await gastoRepository
                        .createQueryBuilder("gasto")

                        .leftJoin("gasto.categoria", "categoria")

                        .where("gasto.usuario_id = :userId", {
                            userId
                        })

                        .andWhere(
                            "categoria.id = :categoriaId",
                            {
                                categoriaId:
                                    meta.categoria.id
                            }
                        )

                        .andWhere(
                            "gasto.data_gasto >= :inicioMes",
                            {
                                inicioMes
                            }
                        )

                        .andWhere(
                            "gasto.data_gasto < :fimMes",
                            {
                                fimMes
                            }
                        )

                        .select(
                            "COALESCE(SUM(gasto.valor), 0)",
                            "total"
                        )

                        .getRawOne();


                const gastoAtual =
                    Number(gastos.total) || 0;


                const limite =
                    Number(meta.valor_limite);


                const percentual =
                    limite > 0
                        ? (gastoAtual / limite) * 100
                        : 0;


                const restante =
                    limite - gastoAtual;


                resultado.push({

                    id: meta.id,

                    categoria: {
                        id: meta.categoria.id,
                        nome: meta.categoria.nome
                    },

                    valor_limite: limite,

                    gasto_atual: gastoAtual,

                    restante,

                    percentual: Number(
                        percentual.toFixed(2)
                    ),

                    mes: meta.mes,

                    ano: meta.ano,

                    criado_em: meta.criado_em

                });

            }


            return res.json(resultado);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao buscar metas."
            });

        }

    }


    // ==========================================
    // ATUALIZAR META
    // ==========================================

    static async update(req: Request, res: Response) {

        try {

            const userId = (req as any).user.id;

            const id =
                Number(req.params.id);


            const {
                valor_limite
            } = req.body;


            const metaRepository =
                AppDataSource.getRepository(Meta);


            const meta =
                await metaRepository.findOne({

                    where: {
                        id,
                        usuario: {
                            id: userId
                        }
                    }

                });


            if (!meta) {

                return res.status(404).json({
                    message: "Meta não encontrada."
                });

            }


            if (
                valor_limite !== undefined &&
                Number(valor_limite) <= 0
            ) {

                return res.status(400).json({
                    message:
                        "O valor da meta deve ser maior que zero."
                });

            }


            if (valor_limite !== undefined) {

                meta.valor_limite =
                    Number(valor_limite);

            }


            await metaRepository.save(meta);


            return res.json({
                message: "Meta atualizada com sucesso.",
                meta
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao atualizar meta."
            });

        }

    }


    // ==========================================
    // EXCLUIR META
    // ==========================================

    static async delete(req: Request, res: Response) {

        try {

            const userId =
                (req as any).user.id;

            const id =
                Number(req.params.id);


            const metaRepository =
                AppDataSource.getRepository(Meta);


            const meta =
                await metaRepository.findOne({

                    where: {
                        id,
                        usuario: {
                            id: userId
                        }
                    }

                });


            if (!meta) {

                return res.status(404).json({
                    message: "Meta não encontrada."
                });

            }


            await metaRepository.remove(meta);


            return res.json({
                message: "Meta excluída com sucesso."
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao excluir meta."
            });

        }

    }

}