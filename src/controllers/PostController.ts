import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class PostController {
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

    public async getPostById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const post = await prisma.post.findUnique({ where: { id: Number(id) } });

            if (!post) {
                return res.status(401).json({ message: "Post não encontrado!" })
            }

            return res.status(200).json({ post })
        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }

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

    public async updatePost(req: Request, res: Response) {
        const { title, about, image } = req.body;
        const { id } = req.params;
        const { userId } = req


        try {
            const post = await prisma.post.findUnique({where: {id: Number(id)}})

            if(!post) {
                return res.status(401).json({message: "Post não encontrado!"})
            }

            const postUpdated = await prisma.post.update({
                where: {
                    id: Number(id),
                    user_id: userId
                },
                data: {
                    title,
                    about,
                    image,
                }
            });

            return res.status(200).json({ message: "Post atualizado com sucesso!", post: postUpdated })

        } catch (error) {
            return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" })
        }
    }
}