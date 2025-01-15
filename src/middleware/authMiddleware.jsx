import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { reqCurrentUser } from '../services/auth';
import { login } from '../contexts/Redux/AuthSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '../common/Loader';

import { tokenIsExpired } from '../utils';

const AuthMiddleware = () => {
  const userId = Cookies.get('userId');
  const refreshToken = Cookies.get('refreshToken');

  if (!userId && tokenIsExpired(refreshToken)) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <Outlet />;
};

export default AuthMiddleware;
