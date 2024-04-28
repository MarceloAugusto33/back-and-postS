import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ message: "Token não informado!" })
        }

        const [, token] = authorization.split(" ");

        const keySecret = String(process.env.SECRET_KEY_AUTH)

        if (!keySecret) {
            return res.status(500).json({ message: "Erro interno com a chave" })
        }

        const decoded = verify(token, keySecret)

        const { id } = decoded as JwtPayload & { id: number }

        req.userId = id

        next()
    } catch (error) {
        return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
    }
}