import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import { prisma } from "../database/prisma";

export class UserController {
    public async getByUsername(req: Request, res: Response) {
        const { username } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: { username },
                select: {
                    id: true,
                    username: true,
                    name: true,
                    about: true,
                    image: true,
                    created_at: true,
                    Post: true
                }
            });

            if (!user) return res.status(401).json({ message: "Usuario não encontrado!" });

            return res.status(200).json({ user })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { name, about, image, password } = req.body;
        const { userId } = req;

        if (!password) {
            return res.status(401).json({ message: "Password é obrigatorio" })
        }
        try {
            const userExists = await prisma.user.findUnique({ where: { id: userId } })

            if (!userExists) {
                return res.status(401).json({ message: "Usuario não encontrado!" })
            }

            const passwordMatched = compare(password, userExists.password);

            if (!passwordMatched) {
                return res.status(401).json({ message: "Password incorreta" });
            }

            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name,
                    about,
                    image
                }
            })

            return res.status(200).json({ message: "Usuario atualizado com sucesso!", user })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }
    
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
