import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { enviarEmailRedefinicaoSenha } from "../utils/mailer";

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
                    id: user.id,
                    role: user.role
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

    // Passo 1: usuário informa o email e recebe um link de redefinição
    static async forgotPassword(req: Request, res: Response) {

        try {

            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    message: "Informe o email."
                });
            }

            // Mensagem sempre igual, exista ou não o email, para não revelar
            // quais emails estão cadastrados no sistema.
            const mensagemPadrao = "Se este email estiver cadastrado, você receberá um link para redefinir sua senha.";

            const user = await userRepository.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(200).json({
                    message: mensagemPadrao
                });
            }

            const tokenBruto = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(tokenBruto).digest("hex");

            user.resetPasswordToken = tokenHash;
            user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // expira em 1 hora

            await userRepository.save(user);

            const frontendUrl = process.env.FRONTEND_URL || "http://127.0.0.1:5500/frontend/assets/pages";
            const link = `${frontendUrl}/redefinir-senha.html?token=${tokenBruto}`;

            await enviarEmailRedefinicaoSenha(user.email, user.nome, link);

            return res.status(200).json({
                message: mensagemPadrao
            });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // Passo 2: usuário define a nova senha usando o token recebido por email
    static async resetPassword(req: Request, res: Response) {

        try {

            const { token, senha, confirmarSenha } = req.body;

            if (!token || !senha || !confirmarSenha) {
                return res.status(400).json({
                    message: "Preencha todos os campos."
                });
            }

            if (senha !== confirmarSenha) {
                return res.status(400).json({
                    message: "As senhas não coincidem."
                });
            }

            if (senha.length < 6) {
                return res.status(400).json({
                    message: "A senha deve ter pelo menos 6 caracteres."
                });
            }

            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

            const user = await userRepository.findOne({
                where: { resetPasswordToken: tokenHash }
            });

            if (!user || !user.resetPasswordExpires || user.resetPasswordExpires.getTime() < Date.now()) {
                return res.status(400).json({
                    message: "Link inválido ou expirado. Solicite uma nova redefinição de senha."
                });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            user.senha = senhaHash;
            user.confirmarSenha = senhaHash;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;

            await userRepository.save(user);

            return res.status(200).json({
                message: "Senha redefinida com sucesso! Você já pode fazer login."
            });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

}