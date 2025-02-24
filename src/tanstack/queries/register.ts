import { IRegisterApiResponse } from "../types/api";
import request from "../request";

const signup = (options: RequestInit) => request<IRegisterApiResponse>(
    {
      path: 'api/register',
    },
    {
      ...options,
      method: 'POST',
    },
  );

export default signup;
