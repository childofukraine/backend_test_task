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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const { database } = database_1.default;
class UsersRepository {
    static createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database.insert(schema_1.usersTable).values(newUser).returning();
            return user;
        });
    }
    static getUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.login, login));
            return user;
        });
    }
    static getUserByLoginAndPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.usersTable.login, login), (0, drizzle_orm_1.eq)(schema_1.usersTable.password, password)));
            return user;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database.select().from(schema_1.usersTable);
            return users;
        });
    }
    static getBossAndSubordinates(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const [boss] = yield this.getUserByLogin(login);
            const subordinates = yield database
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.bossId, boss.userId));
            result.push(boss, ...subordinates);
            return result;
        });
    }
    static newBoss(user, new_boss) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database
                .update(schema_1.usersTable)
                .set({
                bossId: new_boss[0].userId,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.login, user[0].login));
        });
    }
}
exports.UsersRepository = UsersRepository;
