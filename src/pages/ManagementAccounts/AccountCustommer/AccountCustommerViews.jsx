import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import ModalConfirmDelete from '@/components/ModalConfirmDelete/ModalConfirmDelete';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Select, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import {
  MdDelete,
  MdLockOpen,
  MdLockOutline,
  MdOutlineFilterAltOff,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AccountCustommerViews = ({
  filter,
  setFilter,
  listAccountCustommer,
  handleUpdateStatus,
  handleDelAccount,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { Option } = Select;
  const [openDel, setOpenDel] = useState({
    status: false,
    id: '',
    name: '',
  });
  return (
    <div className="text-start text-[0.9rem] flex flex-col  gap-y-4 bg-white rounded-2xl p-3">
      <Breadcrumb pageName="Tài khoản người dùng" />

      <div className="w-full flex items-center justify-between">
        <Typography.Title level={4}>
          Có tất cả
          <span className="font-semibold">
            {' '}
            {listAccountCustommer?.length}{' '}
          </span>
          tài khoản người dùng{' '}
        </Typography.Title>
        <div className="gap-x-2 flex items-center justify-center">
          <Button
            className="bg-green-500 text-white"
            onClick={() => {
              navigate('/attractions/create');
            }}
          >
            Thêm mới
          </Button>
          <Button className="bg-red-500 text-white border-none">Xóa</Button>
        </div>
      </div>
      <div>
        <h2 className="text-red-500 font-semibold mb-2">Danh mục tính năng:</h2>
        <ul className="text-sm font-normal text-black">
          <li>Không hoạt động: tài khoản sẽ không đăng nhập được trên web</li>
        </ul>
      </div>
      <div className="w-full overflow-auto rounded-md ">
        <table className="table min-w-max w-full h-auto overflow-auto  border-spacing-0">
          <thead className="text-black">
            <tr>
              <th className="z-[5] text-xs border text-white_main border-gray-300  border-l-0 border-t-0 bg-blue_main p-2  w-[50px] relative">
                Chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                STT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[180px] relative">
                Tên
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Số ĐT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Email
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
                Tình trạng
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-blue_main p-2  w-[100px] relative">
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

              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="text"
                  placeholder="Nhập tên"
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
                  type="number"
                  value={filter.numberPhone}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      numberPhone: e.target.value,
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
                  value={filter.email}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      email: e.target.value,
                    }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>

              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  size="small"
                  className="no-spinner w-[95px]"
                  value={filter.isActive}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, isActive: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>Chặn HĐ</Option>
                  <Option value={true}>Hoạt động</Option>
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
            </tr>
            {listAccountCustommer.length > 0 ? (
              listAccountCustommer.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={clsx('text-black transition-all duration-150')}
                  >
                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      <input type="checkbox" />
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      {i + 1}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-xs text-start text-black font-semibold border capitalize border-gray-300 border-l-0 border-t-0 p-2 relative">
                      {e.firstname + ' ' + e.lastname}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs text-center border  font-normal border-gray-300 border-l-0 border-t-0 p-2 relative">
                      {e.numberPhone}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border  text-start  font-medium underline border-gray-300 border-l-0 border-t-0 p-2 relative">
                      {e.email}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-xs text-center font-medium  border   border-gray-300 border-l-0 border-t-0 p-2 relative">
                      {e.isActive === true ? (
                        <span className="text-green">Hoạt động</span>
                      ) : (
                        <span className="text-red-500">Chặn HĐ</span>
                      )}

                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300 border-l-0 border-t-0 p-2 relative">
                      <div className="flex items-center justify-center gap-x-1">
                        {e.isActive === true ? (
                          <Icon
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isActive: false },
                              });
                            }}
                            tooltip="Chặn HĐ"
                            className=" text-purple-700"
                          >
                            <MdLockOutline />
                          </Icon>
                        ) : (
                          <Icon
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isActive: true },
                              });
                            }}
                            className="text-blue"
                            tooltip="Hoạt động"
                          >
                            <MdLockOpen />
                          </Icon>
                        )}{' '}
                        <Icon
                          onClick={() => {
                            setOpenDel({
                              status: true,
                              id: e._id,
                              name: e.firstname + ' ' + e.lastname,
                            });
                          }}
                          className=" text-red-500"
                          tooltip="Xóa"
                        >
                          <MdDelete />
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
        onOK={() => {
          handleDelAccount(openDel.id);
          setOpenDel({
            status: false,
            name: '',
            id: '',
          });
        }}
        open={openDel.status}
        setOpen={() => {
          setOpenDel({
            status: false,
            name: '',
            id: '',
          });
        }}
        text={`xóa tk người dùng - ${openDel.name}`}
        okText="Xóa tài khoản"
        cancelText="Hủy"
      />
    </div>
  );
};

export default AccountCustommerViews;
