import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class PostController {
    public async createPost(req: Request, res: Response) {
        const { title, about, image } = req.body;
        const { userId } = req;

        if (!title || !about) {
            return res.status(401).json({ message: "Titulo e descrição são obrigatorios!" });
        }

        if (!userId) {
            return res.status(401).json({ message: "Id do usuario não encontrado!" })
        }

        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    about,
                    image,
                    user_id: userId
                }
            });

            return res.status(201).json({ message: "Post publicado!", post })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }

    public async getAllPost(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            });

            return res.status(200).json({ posts })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }
}