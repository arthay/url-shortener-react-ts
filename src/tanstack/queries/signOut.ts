import request from "../request";

const signOut = () => request(
    { path: 'api/logout' },
    { method: 'POST' },
  );

export default signOut;
