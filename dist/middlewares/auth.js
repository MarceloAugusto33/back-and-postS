"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Token não informado!" });
        }
        const [, token] = authorization.split(" ");
        const keySecret = String(process.env.SECRET_KEY_AUTH);
        if (!keySecret) {
            return res.status(500).json({ message: "Erro interno com a chave" });
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, keySecret);
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(500).json(error instanceof Error ? { message: error.message } : { message: "Erro interno no servidor" });
    }
}
exports.authMiddleware = authMiddleware;
