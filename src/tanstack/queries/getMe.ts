import request from "../request";
import { IUserInfoApiResponse } from "../types/api";

const getMe = async () => request<IUserInfoApiResponse>(
  {path: '/api/me'}
);

export default getMe;
