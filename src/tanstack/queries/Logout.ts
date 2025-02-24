import request from "../request";

const logout = () => request(
    { path: 'api/logout' },
    { method: 'POST' },
  );

export default logout;
