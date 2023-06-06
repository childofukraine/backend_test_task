import Joi from "joi";
import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export class UserValidator {
  static registrationBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string().max(32).required(),
      password: Joi.string().max(32).required(),
      role: Joi.string()
        .required()
        .valid("Administrator", "Boss", "Regular user"),
      boss_id: Joi.string().optional(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static loginBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string().max(32).required(),
      password: Joi.string().max(32).required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static newBossBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      boss_login: Joi.string().max(32).required(),
      user_login: Joi.string().max(32).required(),
      new_boss_login: Joi.string().max(32).required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };
}
