import { ILoginApiResponse } from "../types/api";
import request from "../request";

const login = (options: RequestInit) => request<ILoginApiResponse>(
  { path: 'api/login'},
  {
    ...options,
    method: 'POST'
  },
);

export default login;
