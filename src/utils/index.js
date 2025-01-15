import { jwtDecode } from 'jwt-decode';

export const decodedToken = (token) => {
  if (!token) return null;
  return jwtDecode(token);
};
export const tokenIsExpired = (token) => {
  if (!token) return true;
  const decoded = decodedToken(token);
  let currentDate = new Date();
  return decoded.exp < currentDate.getTime() / 1000;
};
