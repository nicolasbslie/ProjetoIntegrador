import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export class AuthController {

    static async register(req: Request, res: Response) {

        try {

            const { nome, email, senha, confirmarSenha } = req.body;

            if (!nome || !email || !senha || !confirmarSenha) {
                return res.status(400).json({
                    message: "Preencha todos os campos."
                });
            }

            if (senha !== confirmarSenha) {
                return res.status(400).json({
                    message: "As senhas não coincidem."
                });
            }

            const userExists = await userRepository.findOne({
                where: { email }
            });

            if (userExists) {
                return res.status(400).json({
                    message: "Email já cadastrado."
                });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const user = userRepository.create({
                nome,
                email,
                senha: senhaHash,
                confirmarSenha: senhaHash
            });

            await userRepository.save(user);

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso!"
            });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async login(req: Request, res: Response) {

        try {

            const { email, senha } = req.body;

            const user = await userRepository.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(401).json({
                    message: "Email ou senha inválidos."
                });
            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                user.senha
            );

            if (!senhaCorreta) {
                return res.status(401).json({
                    message: "Email ou senha inválidos."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "1d"
                }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24
            });

            return res.status(200).json({
                message: "Login realizado com sucesso.",
                token,
                usuario: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async logout(req: Request, res: Response) {

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout realizado com sucesso."
        });

    }

}