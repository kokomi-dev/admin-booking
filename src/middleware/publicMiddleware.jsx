import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';

export default function PublicMiddleware() {
  const location = useLocation();
  const { pathname } = location;
  const userId = Cookies.get('userId');
  const acsessToken = localStorage.getItem('accessToken');
  if (!acsessToken && !userId) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <Outlet />;
}
