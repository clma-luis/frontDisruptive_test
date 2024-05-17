import { ErrorResponse } from "@/shared/interfaces";
import { connection } from "../config/connection";
import { LOGIN_PATHS_SERVICE } from "./loginPaths";
import { LoginBodyService, LoginServiceResponse, registerBodyService, RegisterServiceResponse } from "./loginTypes";

const { LOGIN_PATH, CREATE_USER_PATH } = LOGIN_PATHS_SERVICE;

const API = connection();

export const loginService = async (body: LoginBodyService): Promise<LoginServiceResponse | ErrorResponse> => {
  const response = await API.post(LOGIN_PATH, body);
  return response;
};

export const createUserService = async (body: registerBodyService): Promise<RegisterServiceResponse | ErrorResponse> => {
  const response = await API.post(CREATE_USER_PATH, body);
  return response;
};
