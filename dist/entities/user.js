"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, login, password, role, bossId) {
        this.userId = userId;
        this.login = login;
        this.password = password;
        this.role = role;
        this.bossId = bossId;
    }
}
exports.User = User;
