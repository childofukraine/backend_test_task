"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const usersValidator_1 = require("../validators/usersValidator");
exports.router = (0, express_1.default)();
exports.router.post("/registration", usersValidator_1.UserValidator.registrationBody, userController_1.UsersController.registration);
exports.router.post("/login", usersValidator_1.UserValidator.loginBody, userController_1.UsersController.login);
exports.router.post("/info", userController_1.UsersController.users);
exports.router.post("/new-boss", usersValidator_1.UserValidator.newBossBody, userController_1.UsersController.newBoss);
