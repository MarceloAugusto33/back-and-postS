import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { prisma } from "../database/prisma";
import { sign } from "jsonwebtoken";

export class SessionController {
    public async create(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Email e senha são obrigatorios!" })
        }
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(401).json({ message: "Email e/ou password invalido!" })
            }

            const passwordMatched = await compare(password, user.password)

            if (!passwordMatched) {
                return res.status(401).json({ message: "Email e/ou password invalido!" })
            }

            const secretKey = String(process.env.SECRET_KEY_AUTH)

            if (!secretKey) {
                return res.status(500).json({ message: "Erro interno na chave!" })
            }

            const token = sign({ id: Number(user.id) }, secretKey, { expiresIn: '1d' })

            return res.status(201).json({ user, token })

        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }
}