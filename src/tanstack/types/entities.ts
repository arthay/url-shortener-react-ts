export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IShortUrl {
  public_id: string;
  from: string;
  to: string;
  visits: number;
  shortenedURL: string;
}
