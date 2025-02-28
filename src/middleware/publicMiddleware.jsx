import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';
import { tokenIsExpired } from '../utils';
import { useLocation } from 'react-router-dom';
import { reqCurrentUser } from '../services/api/auth';
export default function PublicMiddleware() {
  const userId = Cookies.get('userIdAdmin');
  const refreshToken = Cookies.get('refreshTokenAdmin');
  const { pathname } = useLocation();

  if (pathname.includes('auth') && userId && !tokenIsExpired(refreshToken)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
