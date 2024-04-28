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
exports.UserController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../database/prisma");
class UserController {
    getByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const user = yield prisma_1.prisma.user.findUnique({
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
                if (!user)
                    return res.status(401).json({ message: "Usuario não encontrado!" });
                return res.status(200).json({ user });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, about, image, password } = req.body;
            const { userId } = req;
            if (!password) {
                return res.status(401).json({ message: "Password é obrigatorio" });
            }
            try {
                const userExists = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
                if (!userExists) {
                    return res.status(401).json({ message: "Usuario não encontrado!" });
                }
                const passwordMatched = (0, bcryptjs_1.compare)(password, userExists.password);
                if (!passwordMatched) {
                    return res.status(401).json({ message: "Password incorreta" });
                }
                const user = yield prisma_1.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        name,
                        about,
                        image
                    }
                });
                return res.status(200).json({ message: "Usuario atualizado com sucesso!", user });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, name, email, password } = req.body;
            if (!username || !name || !email || !password) {
                return res.status(401).json({ message: "Username, name, email e password são obrigatorios" });
            }
            try {
                const userExists = yield prisma_1.prisma.user.findFirst({
                    where: {
                        OR: [
                            { email },
                            { username }
                        ]
                    }
                });
                if (userExists) {
                    return res.status(401).json({ message: "Email e/ou username em uso!" });
                }
                const hashPassword = yield (0, bcryptjs_1.hash)(password, 8);
                const user = yield prisma_1.prisma.user.create({
                    data: {
                        username,
                        name,
                        email,
                        password: hashPassword
                    }
                });
                return res.status(201).json({ message: "Usuario cadastrado", user });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
}
exports.UserController = UserController;
