"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// To generate schema snapshot run in CLI :
// npx drizzle-kit generate:pg --out migrations-folder --schema src/db/schema.ts
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.varchar)("user_id").primaryKey().notNull(),
    login: (0, pg_core_1.varchar)("login", { length: 32 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 32 }).notNull(),
    role: (0, pg_core_1.varchar)("role", { length: 16 }).notNull(),
    bossId: (0, pg_core_1.varchar)("boss_id"),
});
