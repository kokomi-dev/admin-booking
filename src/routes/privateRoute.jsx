import BlogPage from '@/pages/Blogs';
import CreateBlog from '@/pages/Blogs/CreateBlog/CreateBlog';
import EditBlog from '@/pages/Blogs/EditBlog/EditBlog';
import { BookingAttractions, BookingHotels } from '@/pages/Booking';
import AccountCustommer from '@/pages/ManagementAccounts/AccountCustommer/AccountCustommer';
import AccountUnit from '@/pages/ManagementAccounts/AccountUnit/AccountUnit';
import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import AuthMiddleware from '../middleware/authMiddleware';
import AttractionsPage from '../pages/Attractions';
import CreateAttraction from '../pages/Attractions/CreateAttraction/CreateAttraction';
import EditAttraction from '../pages/Attractions/EditAttraction/EditAttraction';
import ECommerce from '../pages/Dashboard/ECommerce';
import HotelsPage from '../pages/Hotels';
import CreateHotel from '../pages/Hotels/CreateHotel/CreateHotel';
import EditHotel from '../pages/Hotels/EditHotel/EditHotel';

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
  </Route>
);
