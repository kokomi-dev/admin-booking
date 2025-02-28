import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import ModalConfirmDelete from '@/components/ModalConfirmDelete/ModalConfirmDelete';
import { Button, Select, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import {
  MdAutoFixNormal,
  MdBlockFlipped,
  MdDelete,
  MdLockOpen,
  MdLockOutline,
  MdOutlineFilterAltOff,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AccountUnitViews = ({
  filter,
  setFilter,
  listAccountPartner,
  handleUpdateStatus,
  handleDelAccount,
}) => {
  const navigate = useNavigate();
  const [openDel, setOpenDel] = useState({
    status: false,
    id: '',
    name: '',
  });
  const { Option } = Select;
  return (
    <div className="text-start flex flex-col t gap-y-4">
      <Breadcrumb pageName="Doanh nghiệp đã tham gia" />

      <div className="w-full flex items-center justify-between">
        <Typography.Title level={5}>
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
            <MdAutoFixNormal />
            Duyệt nhiều
          </Button>
          <Button className="bg-red-500 text-white border-none">
            <MdDelete />
            Xóa
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-red-500 font-semibold">1.Lưu ý:</h3>
        <ul className="list-disc font-normal text-[0.95rem] pl-4">
          <li>
            Các tài khoản khi không được cấp phép hoạt động, không được duyệt
            thì vẫn chưa được quyền sử dụng KoKoTravel Dashboard để đăng tải
          </li>
        </ul>
      </div>
      <div className="w-full overflow-auto rounded-md ">
        <table className="text-[0.9rem] table min-w-max w-full h-auto overflow-auto  border-spacing-0">
          <thead className="text-black">
            <tr>
              <th className="z-[5]  border text-white_main border-gray-300  border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[50px] relative">
                Chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                STT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Tên DN
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Số ĐT
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Địa chỉ
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>

              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Mã DN
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Mã thuế
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[40px] relative">
                Trạng thái
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Tình trạng
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Quản trị viên
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10]  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main text-xs p-2  w-[100px] relative">
                Tùy chọn
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
            </tr>
          </thead>
          <tbody className="w-full h-auto text-xs">
            <tr>
              <td className=" z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                <Tooltip title={`Xóa bộ lọc`}>
                  <button
                    onClick={() => {
                      setFilter({
                        name: '',
                        numberPhone: '',
                        address: '',
                        idCode: '',
                        taxCode: '',
                        isAcitve: '',
                        isUnitActive: '',
                        nameAdmin: '',
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
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
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
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
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
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="text"
                  value={filter.address}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      address: e.target.value,
                    }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="text"
                  value={filter.idCode}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      idCode: e.target.value,
                    }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce
                  className="no-spinner"
                  type="text"
                  value={filter.taxCode}
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      taxCode: e.target.value,
                    }));
                  }}
                />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  size="small"
                  className="no-spinner w-[95px]"
                  value={filter.isActive}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, isActive: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>OFF</Option>
                  <Option value={true}>ON</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <Select
                  size="small"
                  className="no-spinner w-[95px]"
                  value={filter.isUnitActive}
                  onChange={(value) => {
                    setFilter((pre) => ({ ...pre, isUnitActive: value }));
                  }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={false}>Chưa duyệt</Option>
                  <Option value={true}>Duyệt</Option>
                </Select>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className=" z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
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
                      <div className="flex items-center justify-start gap-x-1">
                        {e.isActive === true ? (
                          <Icon
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isActive: false },
                              });
                            }}
                            tooltip="Dừng HĐ"
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
                            className="text-blue_main"
                            tooltip="Hoạt động"
                          >
                            <MdLockOpen />
                          </Icon>
                        )}{' '}
                        {e.isUnitActive === true ? (
                          <Icon
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isUnitActive: false },
                              });
                            }}
                            className=" text-purple-500"
                            tooltip="Hủy duyệt"
                          >
                            <MdBlockFlipped />
                          </Icon>
                        ) : (
                          <Icon
                            onClick={() => {
                              handleUpdateStatus({
                                id: e._id,
                                data: { isUnitActive: true },
                              });
                            }}
                            className="text-green_main"
                            tooltip="Duyệt"
                          >
                            <MdAutoFixNormal />
                          </Icon>
                        )}
                        <Icon
                          onClick={() =>
                            setOpenDel({
                              status: true,
                              id: e._id,
                              name: e.infoUnit.unitName,
                            })
                          }
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
        text={`xóa tk doanh nghiệp - ${openDel.name}`}
        okText="Xóa doanh nghiệp"
        cancelText="Hủy"
      />
    </div>
  );
};

export default AccountUnitViews;
