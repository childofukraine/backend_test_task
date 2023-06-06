import { pgTable, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// To generate schema snapshot run in CLI :
// npx drizzle-kit generate:pg --out migrations-folder --schema src/db/schema.ts

export const usersTable = pgTable("users", {
  userId: varchar("user_id").primaryKey().notNull(),
  login: varchar("login", { length: 32 }).notNull(),
  password: varchar("password", { length: 32 }).notNull(),
  role: varchar("role", { length: 16 }).notNull(),
  bossId: varchar("boss_id"),
});

export type User = InferModel<typeof usersTable>;
