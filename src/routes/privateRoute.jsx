import { lazy } from 'react';
import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import AuthMiddleware from '../middleware/authMiddleware';

const BlogPage = lazy(() => import('@/pages/Blogs'));
const CreateBlog = lazy(() => import('@/pages/Blogs/CreateBlog/CreateBlog'));
const EditBlog = lazy(() => import('@/pages/Blogs/EditBlog/EditBlog'));

const BookingAttractions = lazy(() =>
  import('@/pages/Booking').then((module) => ({
    default: module.BookingAttractions,
  })),
);
const BookingHotels = lazy(() =>
  import('@/pages/Booking').then((module) => ({
    default: module.BookingHotels,
  })),
);

const AccountCustommer = lazy(
  () => import('@/pages/ManagementAccounts/AccountCustommer/AccountCustommer'),
);
const AccountUnit = lazy(
  () => import('@/pages/ManagementAccounts/AccountUnit/AccountUnit'),
);

const AttractionsPage = lazy(() => import('@/pages/Attractions'));
const CreateAttraction = lazy(
  () => import('@/pages/Attractions/CreateAttraction/CreateAttraction'),
);
const EditAttraction = lazy(
  () => import('@/pages/Attractions/EditAttraction/EditAttraction'),
);

const ECommerce = lazy(() => import('@/pages/Dashboard/ECommerce'));

const HotelsPage = lazy(() => import('@/pages/Hotels'));
const CreateHotel = lazy(
  () => import('@/pages/Hotels/CreateHotel/CreateHotel'),
);
const EditHotel = lazy(() => import('@/pages/Hotels/EditHotel/EditHotel'));
const Chat = lazy(() => import('@/pages/Chat/page'));

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
      path="/attractions-list"
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

    {/* HOTEL ROUTE */}
    <Route
      path="/hotels-list"
      element={
        <>
          <PageTitle title="Lưu trú" />
          <HotelsPage />
        </>
      }
    />
    <Route path="/hotels/create" element={<CreateHotel />} />
    <Route path="/hotels/edit" element={<EditHotel />} />

    {/* END HOTEL */}

    {/* ROUTE ACCOUNT */}
    <Route
      path="/manage-account-unit"
      element={
        <>
          <PageTitle title="Quản lí tài khoản doanh nghiệp" />
          <AccountUnit />
        </>
      }
    />
    <Route
      path="/manage-account-custommer"
      element={
        <>
          <PageTitle title="Quản lí tài khoản người dùng" />
          <AccountCustommer />
        </>
      }
    />
    {/* END ROUTE ACCOUNT */}

    {/* ROUTE BOOKING */}
    <Route
      path="/booking-attractions"
      element={
        <>
          <PageTitle title="Đặt địa điểm tham quan" />
          <BookingAttractions />
        </>
      }
    />
    <Route
      path="/booking-hotels"
      element={
        <>
          <PageTitle title="Đặt nơi lưu trú" />
          <BookingHotels />
        </>
      }
    />
    {/* ROUTE BLOG */}
    <Route
      path="/blogs"
      element={
        <>
          <PageTitle title="Bài viết" />
          <BlogPage />
        </>
      }
    />
    <Route
      path="/blogs/create"
      element={
        <>
          <PageTitle title="Tạo mới bài viết" />
          <CreateBlog />
        </>
      }
    />
    <Route
      path="/blogs/edit"
      element={
        <>
          <PageTitle title="Chỉnh sửa bài viết" />
          <EditBlog />
        </>
      }
    />
    <Route
      path="/chat"
      element={
        <>
          <PageTitle title="Trò chuyện" />
          <Chat />
        </>
      }
    />
  </Route>
);
