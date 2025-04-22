import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import { formatDate } from '@/utils/formatDate';
import formatVietnamCurrency from '@/utils/formatPrice';
import { Button, Checkbox, Select, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { MdCheck, MdClear, MdOutlineFilterAltOff } from 'react-icons/md';

const BookingHotelViews = ({
  listBooking,
  filter,
  setFilter,
  handleUpdateStatusHotel,
}) => {
  const { Option } = Select;
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Nơi lưu trú đã đặt" />
      <div className="w-full flex items-center justify-between">
        <Typography.Title level={5}>
          Có tất cả
          <span className="font-semibold"> {listBooking.length} </span>
          đơn đã được đặt
        </Typography.Title>
      </div>
      <div className="flex flex-col gap-y-2  ">
        <div className="flex flex-col gap-y-1">
          <h3 className="text-red-500 font-medium text-base mb-2">1.Lưu ý:</h3>
          <ul className="text-sm grid gap-2  font-normal list-disc pl-4">
            <li>
              Nếu có thắc mắc về việc sử dụng hãy liên hệ với quản trị viên để
              được hướng dẫn sử dụng
            </li>
            <li>
              Với mỗi phương thức thanh toán khác nhau sẽ có trạng thái khác
              nhau
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-red-500 font-medium text-base mb-2">
            2.Quy định về thanh toán:
          </h3>
          <ul className="text-sm grid gap-2  font-normal list-disc pl-4">
            <li>
              <strong>COD:</strong> hãy xem chuyển khoản thành công thì xác nhận
              lại với khách hàng qua email
            </li>
            <li>
              <strong>ZALOPAY:</strong> phương thức này sẽ chỉ có thành công khi
              mà người dùng đã thanh toán
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full overflow-auto rounded-md ">
        <table className="table text-xs font-medium min-w-max w-full h-auto overflow-auto  border-spacing-0">
          <thead className="text-black">
            <tr className="text-xs">
              <th className="z-[5]  border text-white_main border-gray-300  border-l-0 border-t-0 bg-blue_main p-2  w-[50px] relative">
                STT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold  border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Nơi lưu trú
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold  border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Địa điểm
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold  border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[250px] relative">
                Thông tin phòng
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold  border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[250px] relative">
                Email
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[120px] relative">
                Phương thức thanh toán
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  max-w-[140px] relative">
                Số tiền
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[80px] relative">
                Vé người lớn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[80px] relative">
                Vé trẻ em
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Ngày đặt
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Trạng thái
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Hành động
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
            </tr>
          </thead>
          <tbody className="w-full h-auto">
            <tr>
              <td className=" z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                <Tooltip title={`Xóa bộ lọc`}>
                  <button
                    onClick={() => {
                      setFilter({
                        hotelName: '',
                        hotelAddress: '',
                        hotelRoomName: '',
                        paymentMethod: '',
                        totalBooked: '',
                        numberOfTicketAdult: '',
                        numberOfTicketChildren: '',
                        dateStart: '',
                        hourStart: '',
                        bookedDate: '',
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

              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.hotelName}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      hotelName: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="text"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>

              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.hotelAddress}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      hotelAddress: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="text"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  value={filter.paymentMethod}
                  onChange={(value) => {
                    setFilter((pre) => ({
                      ...pre,
                      paymentMethod: value,
                    }));
                  }}
                  className="w-full"
                >
                  <Option value="">Tất cả</Option>
                  <Option value="cod">Cod</Option>
                  <Option value="banking">Banking</Option>
                  <Option value="zalopay">ZaloPay</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.totalBooked}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      totalBooked: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="number"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.numberOfTicketAdult}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      numberOfTicketAdult: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="number"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.numberOfTicketChildren}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      numberOfTicketChildren: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="number"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  value={filter.bookedDate}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      bookedDate: e.target.value,
                    }));
                  }}
                  className="no-spinner"
                  type="date"
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  value={filter.isSuccess}
                  onChange={(value) => {
                    setFilter((pre) => ({
                      ...pre,
                      isSuccess: value,
                    }));
                  }}
                  className="w-full"
                >
                  <Option value="">Tất cả</Option>
                  <Option value={true}>Thành công</Option>
                  <Option value={false}>Chưa thành công</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
            </tr>
            {listBooking?.length > 0 ? (
              listBooking?.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={clsx(
                      'text-black text-[0.8rem] font-normal transition-all duration-150 text-xs',
                    )}
                  >
                    <td className="z-[10]  border  text-center  border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      {i + 1}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] capitalize font-semibold text-center border border-gray-300 border-l-0 border-t-0 p-2  w-[180px] relative">
                      {e.infoHotel.name}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] capitalize text-center border border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoHotel.address}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] capitalize text-center border border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoHotelRoom?.length > 0 &&
                        e.infoHotelRoom?.map((item, index) => {
                          return (
                            <div className="text-start" key={index}>
                              <div>
                                {' '}
                                <strong>Tên: </strong>
                                {item.name}
                              </div>
                              <div>
                                <strong>SL phòng: </strong>
                                {item.numberBooked}
                              </div>
                            </div>
                          );
                        })}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] font-medium text-black  text-center border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoUser.email}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] font-medium text-green  text-center border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.paymentMethod}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-blue_sub font-medium border  text-center   border-gray-300 border-l-0 border-t-0 p-2  relative">
                      {formatVietnamCurrency(e.totalBooked)}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] font-semibold text-center  border  border-gray-300 border-l-0 border-t-0 p-2 relative">
                      {e.numberOfTicketsBooked.adult}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  text-center font-medium  border   border-gray-300 border-l-0 border-t-0 p-2  relative">
                      {e.numberOfTicketsBooked.children}

                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-red-600 font-semibold border text-center  border-gray-300 border-l-0 border-t-0 p-2 w-[100px] relative">
                      {formatDate(e.bookedDate)}

                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  font-semibold border text-center  border-gray-300 border-l-0 border-t-0 p-2 w-[100px] relative">
                      {e.isSuccess === false ? (
                        <span className="text-red-600">Chưa thành công</span>
                      ) : (
                        <span className="text-green">Thành công</span>
                      )}

                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  font-semibold border text-center  border-gray-300 border-l-0 border-t-0 p-2 w-[120px] relative">
                      {e.paymentMethod === 'cod' ? (
                        <div className="flex ">
                          {e.isSuccess === false ? (
                            <Button
                              size="small"
                              className="text-black_sub text-sm"
                            >
                              <MdCheck />{' '}
                              <span className="text-xs">Xác nhận đã TT</span>
                            </Button>
                          ) : (
                            <Icon
                              className="text-red-500"
                              tooltip="Hủy"
                              onClick={() => {
                                handleUpdateStatusHotel({
                                  id: e._id,
                                  data: {
                                    isSuccess: false,
                                  },
                                });
                              }}
                            >
                              <MdClear />
                            </Icon>
                          )}
                        </div>
                      ) : (
                        <span></span>
                      )}

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
    </div>
  );
};

export default BookingHotelViews;
