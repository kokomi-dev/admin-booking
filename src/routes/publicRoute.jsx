import { Route } from 'react-router-dom';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import PageTitle from '../components/PageTitle';
import PublicMiddleware from '../middleware/publicMiddleware';
export const publicRoute = (
  <Route>
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
