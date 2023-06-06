import Router from "express";
import { UsersController } from "../controller/userController";
import { UserValidator } from "../validators/usersValidator";

export const router = Router();

router.post(
  "/registration",
  UserValidator.registrationBody,
  UsersController.registration
);
router.post("/login", UserValidator.loginBody, UsersController.login);
router.post("/info", UsersController.users);
router.post("/new-boss",UserValidator.newBossBody, UsersController.newBoss);
