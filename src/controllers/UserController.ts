import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import { prisma } from "../database/prisma";

export class UserController {
    public async createUser(req: Request, res: Response) {
        const { username, name, email, password } = req.body;

        if (!username || !name || !email || !password) {
            return res.status(401).json({ message: "Username, name, email e password são obrigatorios" })
        }

        try {
            const userExists = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            });

            if (userExists) {
                return res.status(401).json({ message: "Email e/ou username em uso!" })
            }

            const hashPassword = await hash(password, 8);

            const user = await prisma.user.create({
                data: {
                    username,
                    name,
                    email,
                    password: hashPassword
                }
            })

            return res.status(201).json({ message: "Usuario cadastrado", user })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }
}
