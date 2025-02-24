import { IShortUrl, IUser } from "./entities";

export interface IPagination {
  "currentPage": number;
  "itemsPerPage": number;
  "totalPages": number;
  "totalItems": number;
}

export interface IUserInfoApiResponse {
  user: IUser;
}

export interface ILoginApiResponse {
  token: string;
}

export interface IRegisterApiResponse {
  user: IUser;
}

export interface IShortUrlsApiResponse {
  urls: IShortUrl[];
  pagination: IPagination;
}

export interface ICreateShortUrlApiResponse {
  url: IShortUrl;
}
