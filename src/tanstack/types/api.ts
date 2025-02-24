import { IUser } from "./entities";

export interface IUserInfoApiResponse {
  user: IUser;
}

export interface ILoginApiResponse {
  token: string;
}

export interface IRegisterApiResponse {
  user: IUser;
}
