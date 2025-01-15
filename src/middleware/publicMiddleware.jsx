import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';
import { tokenIsExpired } from '../utils';
import { useLocation } from 'react-router-dom';
import { reqCurrentUser } from '../services/auth';
export default function PublicMiddleware() {
  const userId = Cookies.get('userId');
  const refreshToken = Cookies.get('refreshToken');
  const { pathname } = useLocation();

  if (pathname.includes('auth') && userId && !tokenIsExpired(refreshToken)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
