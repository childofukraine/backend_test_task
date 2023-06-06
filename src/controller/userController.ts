import { badRequest, notFound } from "@hapi/boom";
import { RequestHandler } from "express";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/user";
import {
  BaseResponse,
  LoginRequest,
  NewBossRequest,
  RegistrationRequest,
  TypedResponse,
  UsersListRequest,
  UsersListResponse,
} from "../types";

export class UsersController {
  static registration: RequestHandler = async (
    req: RegistrationRequest,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const { login, password, role } = req.body;
    try {
      if ((role === "Boss" || role === "Regular user") && !req.body.boss_id) {
        throw badRequest("boss_id is required for Boss or Regular user role");
      }
      let boss_id = null;
      if (req.body.boss_id) {
        boss_id = req.body.boss_id;
      }
      const userId = Math.random().toString(36).slice(2, 9);

      const userExist = await UsersRepository.getUserByLogin(login);

      if (userExist.length)
        throw badRequest("User with this login already exists");

      const newUser = new User(userId, login, password, role, boss_id);

      const user = await UsersRepository.createUser(newUser);

      if (!user) throw notFound();

      res.status(200).json({ message: "User is created." });
    } catch (err) {
      next(err);
    }
  };

  static login: RequestHandler = async (
    req: LoginRequest,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const { login, password } = req.body;
    try {
      const user = await UsersRepository.getUserByLoginAndPassword(
        login,
        password
      );

      if (!user.length) throw badRequest("Invalid login or password!");
      res.status(200).json({ message: "Login successfull." });
    } catch (err) {
      next(err);
    }
  };

  static users: RequestHandler = async (
    req: UsersListRequest,
    res: TypedResponse<UsersListResponse>,
    next
  ) => {
    const { login } = req.body;
    try {
      let usersData;
      const [user] = await UsersRepository.getUserByLogin(login);
      if (!user) throw badRequest("User doesn`t exists");
      switch (user.role) {
        case "Administrator":
          usersData = await UsersRepository.getAllUsers();
          break;

        case "Boss":
          usersData = await UsersRepository.getBossAndSubordinates(login);
          break;

        case "Regular user":
          usersData = await UsersRepository.getUserByLogin(login);
          break;
      }

      res.status(200).json({ data: usersData });
    } catch (err) {
      next(err);
    }
  };

  static newBoss: RequestHandler = async (
    req: NewBossRequest,
    res: TypedResponse<BaseResponse>,
    next
  ) => {
    const { boss_login, user_login, new_boss_login } = req.body;
    try {
      const boss = await UsersRepository.getUserByLogin(boss_login);
      const user = await UsersRepository.getUserByLogin(user_login);
      const new_boss = await UsersRepository.getUserByLogin(new_boss_login);

      if (!boss.length || !user.length || !new_boss.length)
        throw badRequest("Someone user doesnt exists,check logins!");

      if (user[0].role === "Administrator")
        throw badRequest("You can change Boss for Administartor");

      if (user[0].bossId !== boss[0].userId)
        throw badRequest("This user is not in your subordinate");

      await UsersRepository.newBoss(user, new_boss);

      res.status(200).json({ message: "Boss updated" });
    } catch (err) {
      next(err);
    }
  };
}
