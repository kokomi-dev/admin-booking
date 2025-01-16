import Icon from '../../components/Icon/Icon';
import InputDebounce from '../../components/InputDebounce/InputDebounce';
import { Button, Tooltip, Typography } from 'antd';
import React from 'react';
import { MdOutlineFilterAltOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const HotelsViews = (props) => {
  const { listHotel, handleUpdateStatus } = props;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Lưu trú" />

      <div className="w-full flex items-center justify-between">
        <Typography.Paragraph>
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
            Thêm mới
          </Button>
          <Button className="bg-red-500 text-white border-none">Xóa</Button>
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

              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[50px] relative">
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
                Trạng thái
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
              <th className="z-[10] text-xs border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  relative">
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
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />

                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
              <td className="text-xs z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                <InputDebounce className="no-spinner" type="text" />
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
            {listHotel.length > 0 ? (
              listHotel.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className={clsx('text-black transition-all duration-150')}
                  >
                    <td className="z-[10] text-xs border  text-center font-normal border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                      {i + 1}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-xs text-center border  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
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
                      {e.createdAt}
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
                      <div className="flex flex-col">{e.listRooms.length}</div>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>

                    <td className="z-[10] text-xs border text-center  font-normal border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                      {e.isActive === true ? (
                        <span>Hoạt động</span>
                      ) : (
                        <span>K hoạt động</span>
                      )}
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                    <td className="z-[10] text-xs border  font-normal border-gray-300 border-l-0 border-t-0 p-2 relative">
                      <div className="w-auto flex flex-col gap-y-1">
                        <Button
                          onClick={() => {
                            navigate('/hotels/edit?slug=' + e.slug);
                          }}
                          type="primary"
                          className="w-fit  bg-bg_primary_blue_sub text-white"
                        >
                          Sửa
                        </Button>
                        <div className="w-fit flex items-center justify-start gap-x-1 ">
                          {e.isActive === true ? (
                            <Button
                              className="w-fit bg-bg_primary_blue_sub2"
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isActive: false },
                                  id: e._id,
                                });
                              }}
                            >
                              Dừng HĐ
                            </Button>
                          ) : (
                            <Button
                              className="w-fit"
                              onClick={() => {
                                handleUpdateStatus({
                                  data: { isActive: true },
                                  id: e._id,
                                });
                              }}
                            >
                              Cho phép
                            </Button>
                          )}
                          <Button className="w-fit" danger>
                            Xóa
                          </Button>
                        </div>
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

export default HotelsViews;
