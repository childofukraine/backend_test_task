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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const boom_1 = require("@hapi/boom");
const user_1 = require("../entities/user");
const user_2 = require("../repositories/user");
class UsersController {
}
exports.UsersController = UsersController;
_a = UsersController;
UsersController.registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, role } = req.body;
    try {
        if ((role === "Boss" || role === "Regular user") && !req.body.boss_id) {
            throw (0, boom_1.badRequest)("boss_id is required for Boss or Regular user role");
        }
        let boss_id = null;
        if (req.body.boss_id) {
            boss_id = req.body.boss_id;
        }
        const userId = Math.random().toString(36).slice(2, 9);
        const userExist = yield user_2.UsersRepository.getUserByLogin(login);
        if (userExist.length)
            throw (0, boom_1.badRequest)("User with this login already exists");
        const newUser = new user_1.User(userId, login, password, role, boss_id);
        const user = yield user_2.UsersRepository.createUser(newUser);
        if (!user)
            throw (0, boom_1.notFound)();
        res.status(200).json({ message: "User is created." });
    }
    catch (err) {
        next(err);
    }
});
UsersController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        const user = yield user_2.UsersRepository.getUserByLoginAndPassword(login, password);
        if (!user.length)
            throw (0, boom_1.badRequest)("Invalid login or password!");
        res.status(200).json({ message: "Login successfull." });
    }
    catch (err) {
        next(err);
    }
});
UsersController.users = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { login } = req.body;
    try {
        let usersData;
        const [user] = yield user_2.UsersRepository.getUserByLogin(login);
        if (!user)
            throw (0, boom_1.badRequest)("User doesn`t exists");
        switch (user.role) {
            case "Administrator":
                usersData = yield user_2.UsersRepository.getAllUsers();
                break;
            case "Boss":
                usersData = yield user_2.UsersRepository.getBossAndSubordinates(login);
                break;
            case "Regular user":
                usersData = yield user_2.UsersRepository.getUserByLogin(login);
                break;
        }
        res.status(200).json({ data: usersData });
    }
    catch (err) {
        next(err);
    }
});
UsersController.newBoss = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boss_login, user_login, new_boss_login } = req.body;
    try {
        const boss = yield user_2.UsersRepository.getUserByLogin(boss_login);
        const user = yield user_2.UsersRepository.getUserByLogin(user_login);
        const new_boss = yield user_2.UsersRepository.getUserByLogin(new_boss_login);
        if (!boss.length || !user.length || !new_boss.length)
            throw (0, boom_1.badRequest)("Someone user doesnt exists,check logins!");
        if (user[0].role === "Administrator")
            throw (0, boom_1.badRequest)("You can change Boss for Administartor");
        if (user[0].bossId !== boss[0].userId)
            throw (0, boom_1.badRequest)("This user is not in your subordinate");
        yield user_2.UsersRepository.newBoss(user, new_boss);
        res.status(200).json({ message: "Boss updated" });
    }
    catch (err) {
        next(err);
    }
});
