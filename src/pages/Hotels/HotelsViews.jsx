import MessNotify from '@/components/MessNotify/MessNotify';
import ModalConfirmDelete from '@/components/ModalConfirmDelete/ModalConfirmDelete';
import ModalEditListRoomView from '@/components/ModalEditListRoomView/ModalEditListRoomView';
import { QUERY_KEY_HOTEL } from '@/configs/QuerykeyStore';
import { deleteHotel } from '@/services/api/hotel';
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Select, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import {
  MdAdd,
  MdArrowDropDown,
  MdAutoFixNormal,
  MdBlockFlipped,
  MdLockOpen,
  MdLockOutline,
  MdModeEdit,
  MdOutlineDelete,
  MdOutlineFilterAltOff,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Icon from '../../components/Icon/Icon';
import InputDebounce from '../../components/InputDebounce/InputDebounce';
import HotelListRoomView from './HotelListRomView';

const HotelsViews = (props) => {
  const {
    listHotel,
    handleUpdateStatus,
    user,
    openListRoom,
    setOpenListRoom,
    filterListRoom,
    setFilterListRoom,
    toogleSubItem,
    filterHotel,
    setFilterHotel,
  } = props;
  const navigate = useNavigate();
  const { Option } = Select;
  const [isOpenEdit, setIsOpenEdit] = useState({
    status: false,
    dataEdit: null,
    type: '',
  });
  const [openDel, setOpenDel] = useState({
    status: false,
    id: '',
  });
  const mutationDeleteHotel = useMutation({
    mutationFn: deleteHotel,
  });
  const queryClient = useQueryClient();
  const handleDeleteHotel = () => {
    mutationDeleteHotel.mutate(openDel.id, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          MessNotify.success('Xóa thành công nơi lưu trú');
          queryClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
          setOpenDel({
            status: false,
            id: '',
          });
        } else {
          MessNotify.error('Lỗi khi xóa nơi lưu trú');
        }
      },
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Lưu trú" />
      <div className="w-full flex items-center justify-between">
        <Typography.Paragraph className="text-[1rem] font-medium">
          Có tất cả
          <span className="font-semibold"> {listHotel?.length} </span>
          địa điểm lưu trú
        </Typography.Paragraph>

        <div className="gap-x-2 flex items-center justify-center">
          <Button
            className="bg-green-500 text-white"
            onClick={() => {
              navigate('/hotels/create');
            }}
          >
            <MdAdd />
            Thêm mới
          </Button>
          <Button className="bg-red-500 text-white border-none">
            <MdOutlineDelete />
            Xóa
          </Button>
        </div>
      </div>
      <p className="w-full text-start flex items-center justify-start text-[1rem] ">
        <span className="text-red-600 font-medium">1.Lưu ý: </span> Bạn phải đặt
        lại số phòng nếu số phòng đã hết, số phòng đã hết khách hàng sẽ không
        thể đặt
      </p>
      <span className="text-red-600 font-medium">
        {' '}
        2.Chỉnh sửa thông tin phòng:{' '}
      </span>{' '}
      <ul className="pl-4 list-disc text-[0.95rem]">
        <li>
          Thông tin phòng, chỗ nghỉ của mỗi nơi lưu trú có thể cập nhật lại
          thông tin trong phần mở rộng của phòng. Nếu có thắc mắc về sử dụng hãy
          liên hệ với quản trị viên
        </li>
        <li>
          Cập nhật số phòng hiện có của từng phòng để người dùng có thể lựa chọn
          đặt phòng của bạn
        </li>
      </ul>
      <span className="text-red-600 font-medium"> 3.Thông báo hiển thị: </span>{' '}
      <div className="flex flex-col lg:max-w-[70%]">
        <div className="grid grid-cols-[15%,2%,80%] gap-x-1">
          <div className="bg-red-200 w-[100px] h-[30px]"></div>
          <span className="text-center">-</span>
          <p className="text-[0.95rem]">
            Đã hết phòng trống, vui lòng bổ sung thêm nếu có phòng trống
          </p>
        </div>
      </div>
      <div className="w-full overflow-auto rounded-md ">
        <table className="table min-w-max w-full h-auto overflow-auto  border-spacing-0">
          <thead className="text-black">
            <tr>
              <th className="z-[5] text-xs border text-white_main border-gray-300  border-l-0 border-t-0 bg-bg_primary_main p-2  w-[50px] relative">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[200px] relative">
                Tên
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[200px] relative">
                Địa chỉ
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Ảnh
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Ngày tạo
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[80px] relative">
                Đánh giá
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[80px] relative">
                Loại phòng hiện có
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Phòng
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[80px] relative">
                Hủy miễn phí
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[80px] relative">
                Nổi bật
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Trạng thái
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] w-auto text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  relative">
                Tùy chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              {user.roles === 'admin' && (
                <th className="z-[10] w-auto text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  relative">
                  Nâng cao
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="w-full h-auto">
            <tr>
              <td className="text-xs z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                <Tooltip title={`Xóa bộ lọc`}>
                  <button
                    onClick={() => {
                      setFilterHotel({
                        name: '',
                        cancelFree: true,
                        rating: null,
                        createdAt: '',
                        isFavorite: null,
                        isActive: null,
                      });
                    }}
                    className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-danger"
                  >
                    <Icon>
                      <MdOutlineFilterAltOff />
                    </Icon>
                  </button>
                </Tooltip>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>

              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="text"
                  value={filterHotel.name}
                  onChange={(e) => {
                    setFilterHotel((pre) => ({ ...pre, name: e.target.value }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="date"
                  value={filterHotel.createdAt}
                  onChange={(value) => {
                    setFilterHotel((pre) => ({ ...pre, createdAt: value }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="number"
                  value={filterHotel.rating}
                  onChange={(e) => {
                    setFilterHotel((pre) => ({
                      ...pre,
                      rating: e.target.value,
                    }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[100px]"
                  value={filterHotel.cancelFree}
                  onChange={(value) => {
                    setFilterHotel((pre) => ({ ...pre, cancelFree: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>Không</Option>
                  <Option value={true}>Có</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[110px]"
                  value={filterHotel.isFavorite}
                  onChange={(value) => {
                    setFilterHotel((pre) => ({ ...pre, isFavorite: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>Thường</Option>
                  <Option value={true}>Nổi bật</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[110px]"
                  value={filterHotel.isActive}
                  onChange={(value) => {
                    setFilterHotel((pre) => ({ ...pre, isActive: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Dừng HĐ</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>

              {user.roles === 'admin' && (
                <td className="text-xs z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative w-auto text-center">
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
              )}
            </tr>
            {listHotel.length > 0 ? (
              listHotel.map((e, i) => {
                return (
                  <Fragment>
                    <tr
                      key={i}
                      className={clsx(
                        'text-black transition-all duration-150',
                        openListRoom === i && 'bg-white',
                      )}
                    >
                      <td className="z-[10] text-xs border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                        {i + 1}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>

                      <td className="z-[10] text-xs text-center border  font-semibold border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                        {e.name}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs text-center border  font-normal border-gray-300 border-l-0 border-t-0 p-2 relative">
                        {e.location.detail}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border  text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                        <img src={e.images[0]} className="w-[60px] h-[60px]" />
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                        {formatDate(e.createdAt)}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs text-center  border  font-normal border-gray-300 border-l-0 border-t-0 p-2   relative">
                        {e.rating}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2   relative">
                        <div className="flex flex-col">
                          {e.listRooms.length}
                        </div>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border text-center font-normal border-gray-300 border-l-0 border-t-0 p-2   relative">
                        <div className="flex items-center justify-center gap-x-1">
                          {e.listRooms.length > 0 && (
                            <Icon
                              tooltip="DS phòng"
                              onClick={() => {
                                toogleSubItem(i);
                              }}
                              className="!p-[0.2rem] text-[0.8rem] underline hover:cursor-pointer text-blue_main_sub hover:text-blue_main"
                            >
                              <MdArrowDropDown
                                className={clsx(
                                  'transition-all duration-300',
                                  openListRoom === i && 'rotate-180',
                                )}
                              />
                            </Icon>
                          )}
                          <Icon
                            onClick={() => {
                              setIsOpenEdit({
                                type: 2,
                                status: true,
                                dataEdit: {
                                  id: e._id,
                                },
                              });
                            }}
                            tooltip="Thêm phòng"
                          >
                            <MdAdd className="text-green_main" />
                          </Icon>
                        </div>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2   relative">
                        <div className="flex flex-col">
                          {e.cancelFree === true ? (
                            <span className="text-black_main font-medium">
                              Có
                            </span>
                          ) : (
                            <span className="text-black_main font-medium">
                              Không
                            </span>
                          )}
                        </div>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2   relative">
                        <div className="flex flex-col">
                          {e.isFavorite === true ? (
                            <span className="text-green_main font-medium">
                              Nổi bật
                            </span>
                          ) : (
                            <span className="text-purple-700 font-medium">
                              Thường
                            </span>
                          )}
                        </div>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                        {e.isActive === true ? (
                          <span className="text-green_main font-medium">
                            Hoạt động
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            K hoạt động
                          </span>
                        )}
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      <td className="z-[10] text-xs border w-auto text-center font-normal border-gray-300 border-l-0 border-t-0 p-2 relative">
                        <div className="w-full flex items-center justify-center  gap-x-2">
                          <Icon
                            onClick={() => {
                              navigate('/hotels/edit?slug=' + e.slug);
                            }}
                            className="w-fit text-blue_main_sub"
                            tooltip="Sửa"
                          >
                            <MdModeEdit />
                          </Icon>
                          {e.isActive === true ? (
                            <Icon
                              className="w-fit text-purple-700"
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isActive: false },
                                  id: e._id,
                                });
                              }}
                              tooltip="Dừng HĐ"
                            >
                              <MdLockOutline />
                            </Icon>
                          ) : (
                            <Icon
                              className="w-fit text-green_main"
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isActive: true },
                                  id: e._id,
                                });
                              }}
                              tooltip="Hoạt động"
                            >
                              <MdLockOpen />
                            </Icon>
                          )}
                          <Icon
                            onClick={() => {
                              setOpenDel({
                                status: true,
                                id: e._id,
                              });
                            }}
                            className="w-fit text-red-500"
                            tooltip="Xóa"
                          >
                            <MdOutlineDelete />
                          </Icon>
                        </div>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                        <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                        <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                      </td>
                      {user.roles === 'admin' && (
                        <td className="z-[10] text-xs border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                          {e.isFavorite === true ? (
                            <Icon
                              tooltip="Bỏ nổi bật"
                              className="text-purple-500 font-medium"
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isFavorite: false },
                                  id: e._id,
                                });
                              }}
                            >
                              <MdBlockFlipped />
                            </Icon>
                          ) : (
                            <Icon
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isFavorite: true },
                                  id: e._id,
                                });
                              }}
                              tooltip="Nổi bật"
                              className="text-green_main font-medium"
                            >
                              <MdAutoFixNormal />
                            </Icon>
                          )}
                          <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                          <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                          <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                          <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                        </td>
                      )}
                    </tr>
                    {openListRoom === i && (
                      <tr>
                        <td colSpan={12} className="p-0 max-w-auto pl-[55px]">
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              openListRoom === i ? 'max-h-full' : 'max-h-0'
                            }`}
                          >
                            <h4 className="font-bold text-left p-2 bg-gray-100">
                              Chi tiết phòng hiện có
                            </h4>
                            <HotelListRoomView
                              filterListRoom={filterListRoom}
                              setFilterListRoom={setFilterListRoom}
                              listRoom={e.listRooms}
                              idHotel={e._id}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <tr className="bg-white border border-l-1 border-gray-300   p-2 font-semibold relative 0">
                <td colSpan={12} className="p-2 border border-gray-300">
                  Danh sách trống
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalEditListRoomView isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <ModalConfirmDelete
        open={openDel.status}
        setOpen={() => {
          setOpenDel({
            status: false,
            id: '',
          });
        }}
        text="xóa nơi lưu trú này không ?"
        okText="Xóa lưu trú"
        onOK={handleDeleteHotel}
      />
    </div>
  );
};

export default HotelsViews;
