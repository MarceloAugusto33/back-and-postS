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
exports.SessionController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../database/prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
class SessionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(401).json({ message: "Email e senha são obrigatorios!" });
            }
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return res.status(401).json({ message: "Email e/ou password invalido!" });
                }
                const passwordMatched = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!passwordMatched) {
                    return res.status(401).json({ message: "Email e/ou password invalido!" });
                }
                const secretKey = String(process.env.SECRET_KEY_AUTH);
                if (!secretKey) {
                    return res.status(500).json({ message: "Erro interno na chave!" });
                }
                const token = (0, jsonwebtoken_1.sign)({ id: Number(user.id) }, secretKey, { expiresIn: '1d' });
                return res.status(201).json({ user, token });
            }
            catch (error) {
                return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
            }
        });
    }
}
exports.SessionController = SessionController;
