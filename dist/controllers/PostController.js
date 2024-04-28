"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const prisma_1 = require("../database/prisma");
class PostController {
    getAllPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield prisma_1.prisma.post.findMany({
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
                return res.status(200).json({ posts });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const post = yield prisma_1.prisma.post.findUnique({ where: { id: Number(id) } });
                if (!post) {
                    return res.status(401).json({ message: "Post não encontrado!" });
                }
                return res.status(200).json({ post });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, about, image } = req.body;
            const { userId } = req;
            if (!title || !about) {
                return res.status(401).json({ message: "Titulo e descrição são obrigatorios!" });
            }
            if (!userId) {
                return res.status(401).json({ message: "Id do usuario não encontrado!" });
            }
            try {
                const post = yield prisma_1.prisma.post.create({
                    data: {
                        title,
                        about,
                        image,
                        user_id: userId
                    }
                });
                return res.status(201).json({ message: "Post publicado!", post });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, about, image } = req.body;
            const { id } = req.params;
            const { userId } = req;
            try {
                const post = yield prisma_1.prisma.post.findUnique({ where: { id: Number(id) } });
                if (!post) {
                    return res.status(401).json({ message: "Post não encontrado!" });
                }
                const postUpdated = yield prisma_1.prisma.post.update({
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
                return res.status(200).json({ message: "Post atualizado com sucesso!", post: postUpdated });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req;
            try {
                const post = yield prisma_1.prisma.post.findUnique({ where: { id: Number(id) } });
                if (!post) {
                    return res.status(401).json({ message: "Post não encontrado!" });
                }
                const postDeleted = yield prisma_1.prisma.post.delete({
                    where: {
                        id: Number(id),
                        user_id: userId
                    }
                });
                return res.status(200).json({ message: "Post deletado!", postDeleted });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
}
exports.PostController = PostController;
