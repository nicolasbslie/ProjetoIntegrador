import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Gasto } from "../models/Gasto";
import { Receita } from "../models/Receita";
import { User } from "../models/User";
import { Categoria } from "../models/Categoria";

export class LancamentoController {
    static async changeType(req: Request, res: Response) {
        const queryRunner = AppDataSource.createQueryRunner();

        try {
            const tipoAtual = String(req.params.tipoAtual).toLowerCase();
            const id = Number(req.params.id);
            const { novoTipo, valor, descricao, categoria_id, observacao, eco_score } = req.body;
            const usuario_id = (req as any).user.id;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: "ID do lançamento inválido." });
            }

            if (!["gasto", "receita"].includes(tipoAtual) || !["gasto", "receita"].includes(novoTipo)) {
                return res.status(400).json({ message: "Tipo de lançamento inválido." });
            }

            if (tipoAtual === novoTipo) {
                return res.status(400).json({ message: "O lançamento já possui esse tipo." });
            }

            await queryRunner.connect();
            await queryRunner.startTransaction();

            const userRepository = queryRunner.manager.getRepository(User);
            const gastoRepository = queryRunner.manager.getRepository(Gasto);
            const receitaRepository = queryRunner.manager.getRepository(Receita);
            const categoriaRepository = queryRunner.manager.getRepository(Categoria);

            const usuario = await userRepository.findOne({ where: { id: usuario_id } });
            if (!usuario) {
                await queryRunner.rollbackTransaction();
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            if (tipoAtual === "gasto" && novoTipo === "receita") {
                const gasto = await gastoRepository.findOne({
                    where: { id, usuario: { id: usuario_id } },
                    relations: { categoria: true }
                });

                if (!gasto) {
                    await queryRunner.rollbackTransaction();
                    return res.status(404).json({ message: "Gasto não encontrado." });
                }

                const receita = receitaRepository.create({
                    usuario,
                    valor: valor ?? gasto.valor,
                    descricao: descricao ?? gasto.descricao
                });

                await receitaRepository.save(receita);
                await gastoRepository.remove(gasto);

                await queryRunner.commitTransaction();
                return res.status(200).json({
                    message: "Gasto convertido para receita com sucesso.",
                    receita
                });
            }

            const receita = await receitaRepository.findOne({
                where: { id, usuario: { id: usuario_id } }
            });

            if (!receita) {
                await queryRunner.rollbackTransaction();
                return res.status(404).json({ message: "Receita não encontrada." });
            }

            if (!categoria_id) {
                await queryRunner.rollbackTransaction();
                return res.status(400).json({ message: "Selecione uma categoria para transformar a receita em gasto." });
            }

            const categoria = await categoriaRepository.findOne({ where: { id: Number(categoria_id) } });
            if (!categoria) {
                await queryRunner.rollbackTransaction();
                return res.status(404).json({ message: "Categoria não encontrada." });
            }

            const gasto = gastoRepository.create({
                usuario,
                categoria,
                valor: valor ?? receita.valor,
                descricao: descricao ?? receita.descricao,
                observacao: observacao ?? "",
                eco_score: eco_score ?? 8
            });

            await gastoRepository.save(gasto);
            await receitaRepository.remove(receita);

            await queryRunner.commitTransaction();
            return res.status(200).json({
                message: "Receita convertida para gasto com sucesso.",
                gasto
            });
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }

            console.error("Erro ao alterar tipo do lançamento:", error);
            return res.status(500).json({
                message: "Erro ao alterar o tipo do lançamento.",
                error
            });
        } finally {
            await queryRunner.release();
        }
    }
}
