import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export class UserController {

    // Listar todos os usuários
    static async findAll(req: Request, res: Response) {
        try {

            const users = await userRepository.find({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    criado_em: true
                }
            });

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar usuários.",
                error
            });
        }
    }


    // Buscar usuário pelo ID
    static async findById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const user = await userRepository.findOne({
                where: {
                    id
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    criado_em: true
                }
            });


            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }


            return res.status(200).json(user);


        } catch (error) {

            return res.status(500).json({
                message: "Erro ao buscar usuário.",
                error
            });

        }
    }



    // Atualizar usuário
    static async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);


            const user = await userRepository.findOne({
                where: {
                    id
                }
            });


            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado."
                });
            }


            const {
                nome,
                email,
                senha
            } = req.body;



            if (nome) {
                user.nome = nome;
            }


            if (email) {
                user.email = email;
            }


            if (senha) {

                const senhaHash = await bcrypt.hash(senha, 10);

                user.senha = senhaHash;
                user.confirmarSenha = senhaHash;

            }



            await userRepository.save(user);



            return res.status(200).json({

                message: "Usuário atualizado com sucesso.",

                usuario: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }

            });



        } catch (error) {

            return res.status(500).json({

                message: "Erro ao atualizar usuário.",
                error

            });

        }

    }




    // Deletar usuário
    static async delete(req: Request, res: Response) {

        try {


            const id = Number(req.params.id);



            const user = await userRepository.findOne({

                where: {
                    id
                }

            });



            if (!user) {

                return res.status(404).json({

                    message: "Usuário não encontrado."

                });

            }



            await userRepository.remove(user);



            return res.status(200).json({

                message: "Usuário excluído com sucesso."

            });



        } catch (error) {


            return res.status(500).json({

                message: "Erro ao excluir usuário.",
                error

            });


        }

    }

}