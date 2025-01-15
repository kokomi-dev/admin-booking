import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = Cookies.get('userId');

    if (accessToken && user) {
      navigate('/dashboard'); // Điều hướng đến dashboard nếu đã đăng nhập
    } else {
      navigate('/auth/signin'); // Điều hướng đến trang đăng nhập nếu không xác thực
    }
  }, [navigate]);

  return children;
};

export default AuthMiddleware;
