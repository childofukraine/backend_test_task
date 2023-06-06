import { and, eq } from "drizzle-orm";
import db from "../db/database";
import { User, usersTable } from "../db/schema";

const { database } = db;

export class UsersRepository {
  static async createUser(newUser: User): Promise<User[]> {
    const user = await database.insert(usersTable).values(newUser).returning();
    return user;
  }

  static async getUserByLogin(login: string): Promise<User[]> {
    const user = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.login, login));
    return user;
  }

  static async getUserByLoginAndPassword(
    login: string,
    password: string
  ): Promise<User[] | []> {
    const user = await database
      .select()
      .from(usersTable)
      .where(
        and(eq(usersTable.login, login), eq(usersTable.password, password))
      );
    return user;
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await database.select().from(usersTable);
    return users;
  }

  static async getBossAndSubordinates(login: string): Promise<User[]> {
    const result = [];
    const [boss] = await this.getUserByLogin(login);
    const subordinates = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.bossId, boss.userId));

    result.push(boss, ...subordinates);
    return result;
  }

  static async newBoss(user: User[], new_boss: User[]): Promise<void> {
    await database
      .update(usersTable)
      .set({
        bossId: new_boss[0].userId,
      })
      .where(eq(usersTable.login, user[0].login));
  }
}
