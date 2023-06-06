"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const boom_1 = __importDefault(require("@hapi/boom"));
class UserValidator {
}
exports.UserValidator = UserValidator;
UserValidator.registrationBody = (req, _res, next) => {
    var _a, _b;
    const schema = joi_1.default.object({
        login: joi_1.default.string().max(32).required(),
        password: joi_1.default.string().max(32).required(),
        role: joi_1.default.string()
            .required()
            .valid("Administrator", "Boss", "Regular user"),
        boss_id: joi_1.default.string().optional(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw boom_1.default.badData((_b = value.error) === null || _b === void 0 ? void 0 : _b.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
UserValidator.loginBody = (req, _res, next) => {
    var _a, _b;
    const schema = joi_1.default.object({
        login: joi_1.default.string().max(32).required(),
        password: joi_1.default.string().max(32).required(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw boom_1.default.badData((_b = value.error) === null || _b === void 0 ? void 0 : _b.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
UserValidator.newBossBody = (req, _res, next) => {
    var _a, _b;
    const schema = joi_1.default.object({
        boss_login: joi_1.default.string().max(32).required(),
        user_login: joi_1.default.string().max(32).required(),
        new_boss_login: joi_1.default.string().max(32).required(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw boom_1.default.badData((_b = value.error) === null || _b === void 0 ? void 0 : _b.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
