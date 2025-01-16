import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ECommerce from '../pages/Dashboard/ECommerce';
import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Chart from '../pages/Chart';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import AuthMiddleware from '../middleware/authMiddleware';
import AttractionsPage from '../pages/Attractions';
import CreateAttraction from '../pages/Attractions/CreateAttraction/CreateAttraction';
import EditAttraction from '../pages/Attractions/EditAttraction/EditAttraction';

export const privateRoute = (
  <Route element={<AuthMiddleware />}>
    <Route
      path="/"
      index
      element={
        <>
          <PageTitle title="Trang chủ" />
          <ECommerce />
        </>
      }
    />
    {/* ROUTE ATTRACTION */}
    <Route
      path="/attractions"
      element={
        <>
          <PageTitle title="Địa điểm du lịch - KoKoTravel" />
          <AttractionsPage />
        </>
      }
    />
    <Route path="attractions/create" element={<CreateAttraction />} />
    <Route path="attractions/edit" element={<EditAttraction />} />

    {/* END ATTRACTION */}

    <Route
      path="/profile"
      element={
        <>
          <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Profile />
        </>
      }
    />
    <Route
      path="/forms/form-elements"
      element={
        <>
          <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <FormElements />
        </>
      }
    />
    <Route
      path="/forms/form-layout"
      element={
        <>
          <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <FormLayout />
        </>
      }
    />
    <Route
      path="/tables"
      element={
        <>
          <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Tables />
        </>
      }
    />
    <Route
      path="/settings"
      element={
        <>
          <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Settings />
        </>
      }
    />
    <Route
      path="/chart"
      element={
        <>
          <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Chart />
        </>
      }
    />
    <Route
      path="/ui/alerts"
      element={
        <>
          <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Alerts />
        </>
      }
    />
    <Route
      path="/ui/buttons"
      element={
        <>
          <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <Buttons />
        </>
      }
    />
  </Route>
);
