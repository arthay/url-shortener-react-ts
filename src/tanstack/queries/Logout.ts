import request from "../request";

const logout = () => request(
    { path: 'api/logout' },
    { method: 'GET' },
  );

export default logout;
