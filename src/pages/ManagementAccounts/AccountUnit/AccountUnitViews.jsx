import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Space, Table, Tooltip, Typography } from 'antd';
import { reqUpdateStatus } from '@/services/auth';
import { QUERY_KEY_ACCOUNT } from '@/configs/QuerykeyStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessNotify from '@/components/MessNotify/MessNotify';
import checkInvalidateDDMMYYYY from '@/utils/checkInvalidate';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import Icon from '@/components/Icon/Icon';
import { MdOutlineFilterAltOff } from 'react-icons/md';
import clsx from 'clsx';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const AccountUnitViews = ({ listAccountPartner, handleUpdateStatus }) => {
  const navigate = useNavigate();
  return (
    <div className="text-start flex flex-col t gap-y-4">
      <Breadcrumb pageName="Doanh nghiệp đã tham gia" />

      <div className="w-full flex items-center justify-between">
        <Typography.Title level={4}>
          Có tất cả
          <span className="font-semibold text-blue_main">
            {' '}
            ( {listAccountPartner.length} ){' '}
          </span>
          doanh nghiệp tham gia{' '}
        </Typography.Title>
        <div className="gap-x-2 flex items-center justify-center">
          <Button
            className="bg-green-500 text-white"
            onClick={() => {
              navigate('/attractions/create');
            }}
          >
            Duyệt nhiều
          </Button>
          <Button className="bg-red-500 text-white border-none">Xóa</Button>
        </div>
      </div>
      <div>
        <h3 className="text-red-500 font-semibold">Lưu ý:</h3>
        <p className="text-black_main font-medium">
          Các tài khoản khi không được cấp phép hoạt động, không được duyệt thì
          vẫn chưa được quyền sử dụng KoKoTravel Dashboard để đăng tải
        </p>
      </div>
      <div className="w-full overflow-auto rounded-md ">
        <table className="text-[0.9rem] table min-w-max w-full h-auto overflow-auto  border-spacing-0">
          <thead className="text-black">
            <tr>
              <th className="z-[5]  border text-white_main border-gray-300  border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[50px] relative">
                Chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                STT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Tên DN
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Số ĐT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Địa chỉ
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Mã DN
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Mã thuế
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[40px] relative">
                Trạng thái
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Tình trạng
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
                Quản trị viên
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_blue_sub p-2  w-[100px] relative">
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
              <td className=" z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                <Tooltip title={`Xóa bộ lọc`}>
                  <button
                    onClick={() => {}}
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
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />

                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="number" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="number" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
            </tr>
            {listAccountPartner.length > 0 ? (
              listAccountPartner.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={clsx('text-black transition-all duration-150')}
                  >
                    <td className="z-[10]  border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      <input type="checkbox" />
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      {i + 1}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10]  text-center border  font-semibold border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoUnit.unitName}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  text-center border  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.numberPhone}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border  text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoUnit.unitAddress}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] font-semibold  border text-start border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.idCode}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  text-start font-semibold  border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.infoUnit.unitTaxCode}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border text-center font-medium border-gray-300 border-l-0 border-t-0 p-2  w-[120px] relative">
                      {e.isActive === true ? (
                        <span className="text-green_main">ON</span>
                      ) : (
                        <span className="text-red-500">OFF</span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border text-center font-medium border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                      {e.isUnitActive === true ? (
                        <span className="text-green_main">Duyệt</span>
                      ) : (
                        <span className="text-red-500">Chưa duyệt</span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.lastname + ' ' + e.firstname}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10]  border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      <div>
                        {e.isActive === true ? (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isActive: false },
                              });
                            }}
                            className="w-[100px] bg-yellow_main text-white"
                          >
                            Dừng
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isActive: true },
                              });
                            }}
                            className="w-[100px] bg-bg_primary_blue_sub text-white"
                          >
                            Cấp phép
                          </Button>
                        )}{' '}
                        {e.isUnitActive === true ? (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isUnitActive: false },
                              });
                            }}
                            className="w-[100px] bg-green_main text-white"
                          >
                            Hủy duyệt
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isUnitActive: true },
                              });
                            }}
                            className="w-[100px] bg-bg_primary_blue_sub text-white"
                          >
                            Duyệt
                          </Button>
                        )}
                        <Button className="w-[100px] bg-red-500 text-white">
                          Xóa
                        </Button>
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
    </div>
  );
};

export default AccountUnitViews;
