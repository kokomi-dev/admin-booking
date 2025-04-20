import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PublicMiddleware from '../middleware/publicMiddleware';
import { lazy } from 'react';
const SignUp = lazy(() => import('@/pages/Authentication/SignUp'));
const SignIn = lazy(() => import('@/pages/Authentication/SignIn'));

export const publicRoute = (
  <Route element={<PublicMiddleware />}>
    <Route
      path="/auth/signin"
      element={
        <>
          <PageTitle title="Đăng nhập | KoKo Quản trị" />
          <SignIn />
        </>
      }
    />
    <Route
      path="/auth/signup"
      element={
        <>
          <PageTitle title="Đăng ký | KoKo Quản trị" />
          <SignUp />
        </>
      }
    />
  </Route>
);
