import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { User } from "./db/schema";

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export interface RegistrationRequest extends Request {
  body: {
    userId: string;
    login: string;
    password: string;
    role: string;
    boss_id?: string;
  };
}

export interface BaseResponse {
  message: string;
}

export interface LoginRequest {
  body: {
    password: string;
    login: string;
  };
}

export interface UsersListRequest {
  body: {
    login: string;
  };
}

export interface UsersListResponse {
  data: User[] | undefined;
}

export interface NewBossRequest {
  body: {
    boss_login: string;
    user_login: string;
    new_boss_login: string;
  };
}
