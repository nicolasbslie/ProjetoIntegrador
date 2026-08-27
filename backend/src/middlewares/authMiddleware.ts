import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
    role?: "admin" | "user";
}


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const token =
            req.cookies?.token ||
            req.headers.authorization?.replace("Bearer ", "");


        if (!token) {
            return res.status(401).json({
                message: "Token não informado."
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;



        // adiciona o usuário na requisição
        (req as any).user = decoded;



        next();


    } catch (error) {

        return res.status(401).json({
            message: "Token inválido ou expirado."
        });

    }

};