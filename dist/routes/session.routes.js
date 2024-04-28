"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = require("express");
const SessionController_1 = require("../controllers/SessionController");
const sessionRouter = (0, express_1.Router)();
exports.sessionRouter = sessionRouter;
const sessionController = new SessionController_1.SessionController();
sessionRouter.post('/', sessionController.create);
