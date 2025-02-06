import ModalConfirmDelete from '@/components/ModalConfirmDelete/ModalConfirmDelete';
import formatVietnamCurrency from '@/utils/formatPrice';
import { Button, Input, Modal, Select, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  MdAdd,
  MdCalendarMonth,
  MdLockOpen,
  MdLockOutline,
  MdModeEdit,
  MdOutlineDelete,
  MdOutlineFilterAltOff,
  MdOutlineQuestionMark,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePickerVI from '../../components/DatePickerVI/DatePickerVI';
import Icon from '../../components/Icon/Icon';
import InputDebounce from '../../components/InputDebounce/InputDebounce';
import checkInvalidateDDMMYYYY from '../../utils/checkInvalidate';
import { listWarningAttraction } from './constant';

const AttractionViews = (props) => {
  const {
    listAttractions,
    handleUpdateStatus,
    setOpenDatePicker,
    openDatePicker,
    handleCloseDatePicker,
    setDateSetAgain,
    handleSendSetDate,
    handleDeleteAttraction,
    openDel,
    setOpenDel,
    filter,
    setFilter,
    openUpdateTickets,
    setOpenUploadTickets,
    handleCloseUploadTickets,
    numberTicketsAgain,
    setNumberTicketsAgain,
    handleUpdateNumberOfTickets,
  } = props;
  const navigate = useNavigate();
  const { Option } = Select;

  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Địa điểm du lịch" />
      <Typography.Title level={4}>
        Danh sách các địa điểm tham quan
      </Typography.Title>
      <div className="w-full flex items-center justify-between">
        <Typography.Title level={5}>
          Có tất cả
          <span className="font-semibold"> {listAttractions.length} </span>
          địa điểm tham quan
        </Typography.Title>
        <div className="gap-x-2 flex items-center justify-center">
          <Button
            className="bg-green-500 text-white"
            onClick={() => {
              navigate('/attractions/create');
            }}
          >
            <MdAdd />
            Thêm mới
          </Button>
          <Button className="bg-red-500 text-white border-none">
            <MdOutlineDelete />
            Xóa nhiều
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-[1rem] ">
        <div>
          <h3 className="text-red-500 font-semibold">1.Lưu ý:</h3>
          <ul className="text-[0.95rem]  font-normal list-disc pl-4">
            <li>
              Nếu có thắc mắc về việc sử dụng hãy liên hệ với quản trị viên để
              được hướng dẫn sử dụng
            </li>
            <li>
              Nếu địa điểm du lịch quá hạn vui lòng cập nhật lại ngày để tiếp
              tục cho người dùng đặt
            </li>
            <li>Số lượng vé của người lớn, trẻ em</li>
          </ul>
        </div>
        <div>
          <h3 className="text-red-500 font-semibold">2.Thông báo hiển thị:</h3>
          <ul className="text-[0.95rem]  list-disc pl-4 font-normal">
            {listWarningAttraction.map((item, index) => {
              return (
                <li
                  key={index}
                  className="w-[200px] flex items-center justify-start gap-x-4 mb-2"
                >
                  <span className="w-[140px] text-[0.9rem] font-normal">
                    {item.label}:
                  </span>
                  <span className={clsx('flex-1 h-[28px]', item.color)}></span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-red-500 font-semibold">3.Sử dụng tìm kiếm:</h3>
          <ul className="text-[0.95rem]  list-disc pl-4 font-normal">
            <li>
              Với 2 ô tìm kiếm, hàng trên là dành cho người lớn, hàng dưới trẻ
              em
            </li>
          </ul>
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
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[120px] relative">
                Tên
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
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
                Số vé còn lại:
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Ngày bắt đầu
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  min-w-[180px] relative">
                Giá
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[60px] relative">
                Số ngày diễn ra
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[70px] relative">
                Hủy miễn phí
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[60px] relative">
                Đánh giá
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Tiêu chí
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
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Tùy chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
            </tr>
          </thead>
          <tbody className="w-full h-auto">
            <tr>
              <td className="text-xs z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                <Tooltip title={`Xóa bộ lọc`}>
                  <button
                    onClick={() => {
                      setFilter({
                        location: '',
                        numberOfTicketsAdult: '',
                        numberOfTicketsChildren: '',
                        name: '',
                        priceAdult: '',
                        priceChildren: '',
                        startDate: '',
                        isTrending: '',
                        duration: '',
                        rating: null,
                        cancelFree: '',
                        isActive: '',
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
                  value={filter.name}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      name: e.target.value,
                    }));
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
                  type="text"
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      location: e.target.value,
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
                <div className="flex flex-col gap-y-1">
                  <InputDebounce
                    className="no-spinner"
                    type="number"
                    value={filter.numberOfTicketsAdult}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        numberOfTicketsAdult: e.target.value,
                      }));
                    }}
                  />
                  <InputDebounce
                    className="no-spinner"
                    type="number"
                    value={filter.numberOfTicketsChildren}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        numberOfTicketsChildren: e.target.value,
                      }));
                    }}
                  />
                </div>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="date"
                  value={filter.startDate}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      startDate: e,
                    }));
                  }}
                  width={125}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <div className="flex flex-col gap-y-1">
                  <InputDebounce
                    className="no-spinner"
                    type="number"
                    value={filter.priceAdult}
                    min={1}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        priceAdult: e.target.value,
                      }));
                    }}
                  />
                  <InputDebounce
                    className="no-spinner"
                    type="number"
                    value={filter.priceChildren}
                    min={1}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 1 || e.target.value === '') {
                        setFilter((pre) => ({
                          ...pre,
                          priceChildren: e.target.value,
                        }));
                      }
                    }}
                  />
                </div>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="number"
                  value={filter.duration}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      duration: e.target.value,
                    }));
                  }}
                  width={70}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[90px]"
                  value={filter.cancelFree}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, cancelFree: value }));
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
                <InputDebounce
                  className="no-spinner"
                  type="number"
                  value={filter.rating}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      rating: e.target.value,
                    }));
                  }}
                  width={70}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>

              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[95px]"
                  value={filter.isTrending}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, isTrending: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>K nổi bật</Option>
                  <Option value={true}>Nổi bật</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
                <Select
                  className="no-spinner w-[100px] "
                  value={filter.isActive}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, isActive: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>Không HĐ</Option>
                  <Option value={true}>Hoạt động</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
            </tr>
            {listAttractions.length > 0 ? (
              listAttractions.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={clsx(
                      'text-black transition-all duration-150',
                      !checkInvalidateDDMMYYYY(e.startDate) && 'bg-gray-200',
                    )}
                  >
                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      {i + 1}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-[0.87rem] text-start border  font-semibold border-gray-300 border-l-0 border-t-0 p-2  relative">
                      {e.name}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs text-start border  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
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
                    <td className="z-[10] font-semibold text-[0.8rem] border text-start border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      <span
                        className={clsx(
                          e?.numberOfTickets.adult == 0 && 'text-red-600',
                        )}
                      >
                        Người lớn: {e?.numberOfTickets.adult}
                      </span>
                      <br />
                      <span
                        className={clsx(
                          e?.numberOfTickets.children == 0 && 'text-red-600',
                        )}
                      >
                        Trẻ em: {e?.numberOfTickets.children}
                      </span>
                      {
                        <Fragment>
                          <Button
                            onClick={() => {
                              setOpenUploadTickets({
                                status: true,
                                index: i,
                                id: e._id,
                              });
                              setNumberTicketsAgain({
                                adult: e.numberOfTickets.adult,
                                children: e.numberOfTickets.children,
                              });
                            }}
                            className={clsx(
                              'text-[0.8rem] px-[4px] border-blue_main_sub text-blue_main_sub',
                              e.numberOfTickets.adult == 0 ||
                                (e.numberOfTickets.children == 0 &&
                                  'border-red-400 text-red-600 !hover:border-red-600 !hover:text-red-700'),
                            )}
                          >
                            <MdOutlineQuestionMark /> Cập nhật vé
                          </Button>
                          <Modal
                            open={
                              openUpdateTickets.status &&
                              openUpdateTickets.index === i
                            }
                            okText={
                              <span className="font-medium text-white hover:text-white">
                                Cập nhật vé
                              </span>
                            }
                            cancelText="Hủy"
                            onCancel={handleCloseUploadTickets}
                            onOk={handleUpdateNumberOfTickets}
                            className="text-black_main"
                            centered
                          >
                            <span className="font-medium block ">
                              Cập nhật lại vé:{' '}
                              <span className="font-semibold text-blue_main_sub text-[1rem]">
                                {e.name}
                              </span>
                            </span>
                            <br />
                            <div className="flex flex-col items-start justify-start gap-y-2">
                              <div className="flex items-center justify-start gap-x-2">
                                <span className="font-semibold min-w-[120px]">
                                  Vé người lớn:{' '}
                                  <span className="text-red-600 text-[1rem]">
                                    {e.numberOfTickets.adult}
                                  </span>
                                </span>
                                <Input
                                  value={numberTicketsAgain.adult}
                                  onChange={(e) => {
                                    setNumberTicketsAgain((pre) => ({
                                      ...pre,
                                      adult: e.target.value,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-start gap-x-2">
                                <span className=" font-semibold min-w-[120px]">
                                  Vé trẻ em:{' '}
                                  <span className="text-red-600 text-[1rem]">
                                    {e.numberOfTickets.children}
                                  </span>
                                </span>
                                <Input
                                  value={numberTicketsAgain.children}
                                  onChange={(e) => {
                                    setNumberTicketsAgain((pre) => ({
                                      ...pre,
                                      children: e.target.value,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          </Modal>
                        </Fragment>
                      }
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs text-start font-semibold  border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      <span
                        className={clsx(
                          'text-center block',
                          !checkInvalidateDDMMYYYY(e.startDate)
                            ? 'text-red-600'
                            : 'text-green-600',
                        )}
                      >
                        {e.startDate}
                      </span>
                      {!checkInvalidateDDMMYYYY(e.startDate) && (
                        <Fragment>
                          <Button
                            onClick={() => {
                              setOpenDatePicker({
                                status: true,
                                index: i,
                                id: e._id,
                              });
                            }}
                            className="text-[0.8rem] px-[4px]"
                          >
                            <MdCalendarMonth /> Cập nhật ngày
                          </Button>
                          <Modal
                            centered
                            open={
                              openDatePicker.status &&
                              openDatePicker.index === i
                            }
                            okText={
                              <span className="font-medium text-white hover:text-white">
                                Cập nhật ngày
                              </span>
                            }
                            cancelText="Hủy"
                            onCancel={handleCloseDatePicker}
                            onOk={handleSendSetDate}
                            className="text-black_main"
                          >
                            <span className="font-medium block ">
                              Cập nhật lại ngày:{' '}
                              <span className="font-semibold text-blue_main_sub text-[1rem]">
                                {e.name}
                              </span>
                            </span>
                            <br />
                            <div className="flex items-center justify-start gap-x-2">
                              <span className="text-red-500 line-through font-semibold">
                                {e.startDate}
                              </span>
                              <DatePickerVI
                                onDateChange={(date, dateString) => {
                                  setDateSetAgain(dateString);
                                }}
                              />
                            </div>
                          </Modal>
                        </Fragment>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-[0.8rem] border  font-normal border-gray-300 border-l-0 border-t-0 p-2  relative">
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          Người lớn:
                          <span className="text-blue_main_sub">
                            {formatVietnamCurrency(e.price[0])}
                          </span>
                        </span>
                        <span className="font-semibold">
                          Trẻ em:
                          <span className="text-blue_main_sub">
                            {formatVietnamCurrency(e.price[1])}
                          </span>
                        </span>
                      </div>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border text-center font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                      {e.duration}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>{' '}
                    <td className="z-[10] text-xs border text-center font-medium border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                      {e.cancelFree === true ? (
                        <span className="text-green_main">Có</span>
                      ) : (
                        <span className="text-yellow_main">Không</span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border text-center font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                      {e.rating}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.isTrending === true ? (
                        <span>Nổi bật</span>
                      ) : (
                        <span>Không nổi bật</span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.isActive === true ? (
                        <span className="font-semibold text-blue-600">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="font-semibold text-red-600">
                          K hoạt động
                        </span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      <div className="w-auto flex items-center justify-start gap-x-2">
                        <Icon
                          onClick={() => {
                            navigate('/attractions/edit?slug=' + e.slug);
                          }}
                          className="text-blue_main_sub"
                          tooltip="Sửa"
                        >
                          <MdModeEdit />
                        </Icon>
                        {e.isActive === true ? (
                          <Icon
                            className="w-fit text-yellow_main"
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
                  </tr>
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
      <ModalConfirmDelete
        open={openDel.status}
        setOpen={() => {
          setOpenDel({
            status: false,
            id: '',
          });
        }}
        text="xóa địa điểm du lịch này"
        okText="Xóa địa điểm"
        onOK={handleDeleteAttraction}
      />
    </div>
  );
};

export default AttractionViews;
