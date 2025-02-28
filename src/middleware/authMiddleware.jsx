import Cookies from 'js-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { tokenIsExpired } from '../utils';

const AuthMiddleware = () => {
  const userId = Cookies.get('userIdAdmin');
  const refreshToken = Cookies.get('refreshTokenAdmin');
  const location = useLocation();
  const { pathname } = location;

  if (!userId && tokenIsExpired(refreshToken)) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <Outlet />;
};

export default AuthMiddleware;
